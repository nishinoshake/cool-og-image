import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';

const notoSerif = readFileSync(`${__dirname}/../_fonts/NotoSerifJP-ExtraLight.woff2`).toString('base64');

function getCss() {
    return `
    @font-face {
        font-family: 'Noto Serif JP';
        font-style:  normal;
        font-weight: 200;
        src: url(data:font/woff2;charset=utf-8;base64,${notoSerif}) format('woff2');
    }
    body {
        background: #fff;
        height: 100vh;
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.1em;
        font-family: 'Noto Serif JP', serif;
        font-weight: 200;
    }
    .heading {
        margin-bottom: 40px;
        padding: 0 200px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        font-size: 64px;
        font-style: normal;
        color: #222;
        line-height: 1.4;
    }
    .heading span {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        padding: 0.2em;
        color: #fff;
        background-color: #222;
    }
    .text {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ja {
        font-size: 50px;
        font-style: normal;
        color: #444;
        line-height: 1.4;
    }
    .en {
        margin-left: 0.5em;
        font-size: 50px;
        font-style: normal;
        color: #444;
        line-height: 1.4;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, cool } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div class="heading"><span>${sanitizeHtml(text)}</span></div>
        <div class="text">
            <div class="ja">${sanitizeHtml(cool ? 'お洒落だね' : '温かいね')}</div>
            <div class="en">${sanitizeHtml(cool ? `It's cool` : `It's not cool`)}</div>
        </div>
    </body>
</html>`;
}
