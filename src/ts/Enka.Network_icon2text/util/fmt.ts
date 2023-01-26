export function fmt(template: string, values?: { [key: string]: string | number | null | undefined }): string {
    if (!values) return template;

    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const format = new Function(...Object.keys(values), `return \`${template}\`;`);
    return format(...Object.values(values).map((value) => value ?? "")) as string;
}
