import { isAppError, ValidationError } from "@/lib/errors";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/client";
import { NextFunction, Request, Response } from "express";
import z from "zod";

function formatZodError(error: z.ZodError): Record<string, string[]>  {
    const formattedErrors: Record<string, string[]> = {}

    error.issues.forEach((issue) => {
        const path = issue.path.join('.')

        if(!formattedErrors[path]) {
            formattedErrors[path] = []
        }
        formattedErrors[path].push(issue.message)
    })

    return formattedErrors
}


export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {

    if (err instanceof z.ZodError) {
        console.log(err)
        return res.status(400).send({
            error: 'Validation failed',
            code: 'VALIDATION_ERROR',
            details: formatZodError(err)
        })
    }

    if (isAppError(err)) {
        return res.status(err.statusCode).send({
            error: err.message,
            code: err.code,
            ...(err.details ? { details: err.details } : {})
        })
    }

    if(err instanceof PrismaClientKnownRequestError) {
        if(err.code === 'P2002') {
            const target = (err.meta as Record<string, string[]>)?.target as string[]
            return res.status(409).send({
                error: `A record with this ${target?.join(', ') || 'value'} already exists`,
                code: 'CONFLICT_ERROR'
            })
        }

        if(err.code === 'P2003') {
            return res.status(400).send({
                error: `Invalid reference to related record`,
                code: 'INVALID_REFERENCE_ERROR'
            })
        }

        if(err.code === 'P2025') {
            return res.status(404).send({
                error: 'Record not found',
                code: 'NOT_FOUND_ERROR'
            })
        }

        if(err instanceof PrismaClientValidationError) {
            return res.status(400).send({
                error: 'Invalid data provided',
                code: 'VALIDATION_ERROR'
            })
        }

        if(err instanceof SyntaxError && 'body' in err) {
            return res.status(400).send({
                error: 'Invalid JSON in request body',
                code: 'INVALID_JSON_ERROR'
            })
        }

        res.status(500).send({
            error: err.message,
            code: err.code
        })
    }
}