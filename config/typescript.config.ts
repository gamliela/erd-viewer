// allow import of png images
// since we use "url-loader" plugin, the content type is simply a string (url)
declare module '*.png' {
    const content: string;
    export default content;
}

// allow import of jpeg images
// since we use "url-loader" plugin, the content type is simply a string (url)
declare module '*.jpeg' {
    const content: string;
    export default content;
}

// allow import of jpg images
// since we use "url-loader" plugin, the content type is simply a string (url)
declare module '*.jpg' {
    const content: string;
    export default content;
}

// allow import of gif images
// since we use "url-loader" plugin, the content type is simply a string (url)
declare module '*.gif' {
    const content: string;
    export default content;
}

// allow import of svg images
// since we use "url-loader" plugin, the content type is simply a string (url)
declare module '*.svg' {
    const content: string;
    export default content;
}
