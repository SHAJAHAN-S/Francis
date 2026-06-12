declare module 'react-helmet-async' {
    import type { ComponentType } from 'react';

    export const Helmet: ComponentType<any>;
    export const HelmetProvider: ComponentType<any>;
    export const HelmetConsumer: ComponentType<any>;
    export const HelmetData: any;
    export interface HelmetProps {
        [key: string]: any;
    }
}

declare module 'firebase/firestore' {
    export function getFirestore(app?: any): any;
    export function collection(...args: any[]): any;
    export function doc(...args: any[]): any;
    export function getDoc(...args: any[]): any;
    export function setDoc(...args: any[]): any;
    export function query(...args: any[]): any;
    export function where(...args: any[]): any;
    export function orderBy(...args: any[]): any;
    export function limit(...args: any[]): any;
    export function onSnapshot(...args: any[]): any;
    export function addDoc(...args: any[]): any;
    export function updateDoc(...args: any[]): any;
    export function deleteDoc(...args: any[]): any;
    export const Timestamp: any;
}
