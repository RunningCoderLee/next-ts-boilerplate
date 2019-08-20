/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.css'
declare module '*.less'
// declare module '*.scss'
declare module '*.sass'

declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}
