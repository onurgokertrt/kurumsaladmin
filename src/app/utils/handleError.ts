import { NextResponse } from 'next/server';
import { logAction } from './logAction';
import { HTTP_STATUS_CODE_ERROR } from '../constants';

export function handleError(module: string, action: string, error: unknown) {
    if (error instanceof Error) {
        logAction(module, action, error.message);
        return NextResponse.json({ message: error.message }, { status: HTTP_STATUS_CODE_ERROR.INTERNAL_SERVER_ERROR });
    } else {
        logAction(module, action, 'An unknown error occurred');
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: HTTP_STATUS_CODE_ERROR.INTERNAL_SERVER_ERROR });
    }
}
