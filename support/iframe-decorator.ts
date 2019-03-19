import { IframePage } from "../pages/app/iframePage";

export function iframe(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {

    const originalMethod = descriptor.value; // save a reference to the original method
    descriptor.value = async function (...args: any[]) {
        const iframePage: IframePage = new IframePage();
        // pre
        await iframePage.switchToIframe();
        // run original annotated method and store result
        const result = await originalMethod.apply(this, args);
        // post
        await iframePage.switchOffIframe();
        // return the result of the original method 
        return result;
    };
    return descriptor;

}