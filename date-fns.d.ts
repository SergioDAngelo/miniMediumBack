declare module 'date-fns' {
    export function format(
      date: Date | number,
      formatStr: string,
      options?: {
        locale?: Locale;
      }
    ): string
}