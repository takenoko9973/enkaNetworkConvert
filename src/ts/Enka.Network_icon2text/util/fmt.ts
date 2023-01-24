export function fmt(template: string, values?: { [key: string]: string | number | null | undefined }): string {
    return !values
        ? template
        : new Function(...Object.keys(values), `return \`${template}\`;`)(...Object.values(values).map(value => value ?? ''));
}