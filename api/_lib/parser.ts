import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { query } = parse(req.url || '/', true);
    const { cool, text } = (query || {});

    if (Array.isArray(cool)) {
        throw new Error('Expected a single cool');
    }
    if (Array.isArray(text)) {
        throw new Error('Expected a single text');
    }
    
    const parsedRequest: ParsedRequest = {
        fileType: 'jpeg',
        text: decodeURIComponent(text || ''),
        cool: cool === '1' || cool === 'true'
    };

    return parsedRequest;
}
