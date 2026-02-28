import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseSuspenseQueryOptions } from "@tanstack/react-query";
export class ApiError extends Error {
    status: number;
    statusText: string;
    body: unknown;
    constructor(status: number, statusText: string, body: unknown){
        super(`HTTP ${status}: ${statusText}`);
        this.name = "ApiError";
        this.status = status;
        this.statusText = statusText;
        this.body = body;
    }
}
export interface ComplexValue {
    display?: string | null;
    primary?: boolean | null;
    ref?: string | null;
    type?: string | null;
    value?: string | null;
}
export interface ElectricalFaultOut {
    a?: number;
    b?: number;
    c?: number;
    g?: number;
    ia?: number | null;
    ib?: number | null;
    ic?: number | null;
    va?: number | null;
    vb?: number | null;
    vc?: number | null;
}
export interface HTTPValidationError {
    detail?: ValidationError[];
}
export interface Name {
    family_name?: string | null;
    given_name?: string | null;
}
export interface NasaEquipmentOut {
    cycle: number;
    id: number;
    op_set1?: number | null;
    op_set2?: number | null;
    op_set3?: number | null;
    remaining_useful_life: number;
    sensor_measure1?: number | null;
    sensor_measure10?: number | null;
    sensor_measure11?: number | null;
    sensor_measure12?: number | null;
    sensor_measure13?: number | null;
    sensor_measure14?: number | null;
    sensor_measure15?: number | null;
    sensor_measure16?: number | null;
    sensor_measure17?: number | null;
    sensor_measure18?: number | null;
    sensor_measure19?: number | null;
    sensor_measure2?: number | null;
    sensor_measure20?: number | null;
    sensor_measure21?: number | null;
    sensor_measure3?: number | null;
    sensor_measure4?: number | null;
    sensor_measure5?: number | null;
    sensor_measure6?: number | null;
    sensor_measure7?: number | null;
    sensor_measure8?: number | null;
    sensor_measure9?: number | null;
}
export interface PredictiveMaintenanceSummaryOut {
    a_phase_fault_count: number;
    b_phase_fault_count: number;
    c_phase_fault_count: number;
    electrical_fault_row_count: number;
    ground_fault_count: number;
    nasa_row_count: number;
    nasa_unique_units: number;
    transformer_row_count: number;
}
export interface TransformerReadingOut {
    ati?: number | null;
    device_time_stamp?: string | null;
    il1?: number | null;
    il2?: number | null;
    il3?: number | null;
    inut?: number | null;
    oli?: number | null;
    oti?: number | null;
    oti_a?: number | null;
    oti_t?: number | null;
    vl1?: number | null;
    vl12?: number | null;
    vl2?: number | null;
    vl23?: number | null;
    vl3?: number | null;
    vl31?: number | null;
    wti?: number | null;
}
export interface User {
    active?: boolean | null;
    display_name?: string | null;
    emails?: ComplexValue[] | null;
    entitlements?: ComplexValue[] | null;
    external_id?: string | null;
    groups?: ComplexValue[] | null;
    id?: string | null;
    name?: Name | null;
    roles?: ComplexValue[] | null;
    schemas?: UserSchema[] | null;
    user_name?: string | null;
}
export const UserSchema = {
    "urn:ietf:params:scim:schemas:core:2.0:User": "urn:ietf:params:scim:schemas:core:2.0:User",
    "urn:ietf:params:scim:schemas:extension:workspace:2.0:User": "urn:ietf:params:scim:schemas:extension:workspace:2.0:User"
} as const;
export type UserSchema = typeof UserSchema[keyof typeof UserSchema];
export interface ValidationError {
    loc: (string | number)[];
    msg: string;
    type: string;
}
export interface VersionOut {
    version: string;
}
export interface CurrentUserParams {
    "X-Forwarded-Host"?: string | null;
    "X-Forwarded-Preferred-Username"?: string | null;
    "X-Forwarded-User"?: string | null;
    "X-Forwarded-Email"?: string | null;
    "X-Request-Id"?: string | null;
    "X-Forwarded-Access-Token"?: string | null;
}
export const currentUser = async (params?: CurrentUserParams, options?: RequestInit): Promise<{
    data: User;
}> =>{
    const res = await fetch("/api/current-user", {
        ...options,
        method: "GET",
        headers: {
            ...(params?.["X-Forwarded-Host"] != null && {
                "X-Forwarded-Host": params["X-Forwarded-Host"]
            }),
            ...(params?.["X-Forwarded-Preferred-Username"] != null && {
                "X-Forwarded-Preferred-Username": params["X-Forwarded-Preferred-Username"]
            }),
            ...(params?.["X-Forwarded-User"] != null && {
                "X-Forwarded-User": params["X-Forwarded-User"]
            }),
            ...(params?.["X-Forwarded-Email"] != null && {
                "X-Forwarded-Email": params["X-Forwarded-Email"]
            }),
            ...(params?.["X-Request-Id"] != null && {
                "X-Request-Id": params["X-Request-Id"]
            }),
            ...(params?.["X-Forwarded-Access-Token"] != null && {
                "X-Forwarded-Access-Token": params["X-Forwarded-Access-Token"]
            }),
            ...options?.headers
        }
    });
    if (!res.ok) {
        const body = await res.text();
        let parsed: unknown;
        try {
            parsed = JSON.parse(body);
        } catch  {
            parsed = body;
        }
        throw new ApiError(res.status, res.statusText, parsed);
    }
    return {
        data: await res.json()
    };
};
export const currentUserKey = (params?: CurrentUserParams)=>{
    return [
        "/api/current-user",
        params
    ] as const;
};
export function useCurrentUser<TData = {
    data: User;
}>(options?: {
    params?: CurrentUserParams;
    query?: Omit<UseQueryOptions<{
        data: User;
    }, ApiError, TData>, "queryKey" | "queryFn">;
}) {
    return useQuery({
        queryKey: currentUserKey(options?.params),
        queryFn: ()=>currentUser(options?.params),
        ...options?.query
    });
}
export function useCurrentUserSuspense<TData = {
    data: User;
}>(options?: {
    params?: CurrentUserParams;
    query?: Omit<UseSuspenseQueryOptions<{
        data: User;
    }, ApiError, TData>, "queryKey" | "queryFn">;
}) {
    return useSuspenseQuery({
        queryKey: currentUserKey(options?.params),
        queryFn: ()=>currentUser(options?.params),
        ...options?.query
    });
}
export interface ListElectricalFaultsParams {
    fault_type?: string | null;
    limit?: number;
    "X-Forwarded-Host"?: string | null;
    "X-Forwarded-Preferred-Username"?: string | null;
    "X-Forwarded-User"?: string | null;
    "X-Forwarded-Email"?: string | null;
    "X-Request-Id"?: string | null;
    "X-Forwarded-Access-Token"?: string | null;
}
export const listElectricalFaults = async (params?: ListElectricalFaultsParams, options?: RequestInit): Promise<{
    data: ElectricalFaultOut[];
}> =>{
    const searchParams = new URLSearchParams();
    if (params?.fault_type != null) searchParams.set("fault_type", String(params?.fault_type));
    if (params?.limit != null) searchParams.set("limit", String(params?.limit));
    const queryString = searchParams.toString();
    const url = queryString ? `/api/electrical-faults?${queryString}` : "/api/electrical-faults";
    const res = await fetch(url, {
        ...options,
        method: "GET",
        headers: {
            ...(params?.["X-Forwarded-Host"] != null && {
                "X-Forwarded-Host": params["X-Forwarded-Host"]
            }),
            ...(params?.["X-Forwarded-Preferred-Username"] != null && {
                "X-Forwarded-Preferred-Username": params["X-Forwarded-Preferred-Username"]
            }),
            ...(params?.["X-Forwarded-User"] != null && {
                "X-Forwarded-User": params["X-Forwarded-User"]
            }),
            ...(params?.["X-Forwarded-Email"] != null && {
                "X-Forwarded-Email": params["X-Forwarded-Email"]
            }),
            ...(params?.["X-Request-Id"] != null && {
                "X-Request-Id": params["X-Request-Id"]
            }),
            ...(params?.["X-Forwarded-Access-Token"] != null && {
                "X-Forwarded-Access-Token": params["X-Forwarded-Access-Token"]
            }),
            ...options?.headers
        }
    });
    if (!res.ok) {
        const body = await res.text();
        let parsed: unknown;
        try {
            parsed = JSON.parse(body);
        } catch  {
            parsed = body;
        }
        throw new ApiError(res.status, res.statusText, parsed);
    }
    return {
        data: await res.json()
    };
};
export const listElectricalFaultsKey = (params?: ListElectricalFaultsParams)=>{
    return [
        "/api/electrical-faults",
        params
    ] as const;
};
export function useListElectricalFaults<TData = {
    data: ElectricalFaultOut[];
}>(options?: {
    params?: ListElectricalFaultsParams;
    query?: Omit<UseQueryOptions<{
        data: ElectricalFaultOut[];
    }, ApiError, TData>, "queryKey" | "queryFn">;
}) {
    return useQuery({
        queryKey: listElectricalFaultsKey(options?.params),
        queryFn: ()=>listElectricalFaults(options?.params),
        ...options?.query
    });
}
export function useListElectricalFaultsSuspense<TData = {
    data: ElectricalFaultOut[];
}>(options?: {
    params?: ListElectricalFaultsParams;
    query?: Omit<UseSuspenseQueryOptions<{
        data: ElectricalFaultOut[];
    }, ApiError, TData>, "queryKey" | "queryFn">;
}) {
    return useSuspenseQuery({
        queryKey: listElectricalFaultsKey(options?.params),
        queryFn: ()=>listElectricalFaults(options?.params),
        ...options?.query
    });
}
export interface ListNasaEquipmentParams {
    equipment_id?: number | null;
    limit?: number;
    "X-Forwarded-Host"?: string | null;
    "X-Forwarded-Preferred-Username"?: string | null;
    "X-Forwarded-User"?: string | null;
    "X-Forwarded-Email"?: string | null;
    "X-Request-Id"?: string | null;
    "X-Forwarded-Access-Token"?: string | null;
}
export const listNasaEquipment = async (params?: ListNasaEquipmentParams, options?: RequestInit): Promise<{
    data: NasaEquipmentOut[];
}> =>{
    const searchParams = new URLSearchParams();
    if (params?.equipment_id != null) searchParams.set("equipment_id", String(params?.equipment_id));
    if (params?.limit != null) searchParams.set("limit", String(params?.limit));
    const queryString = searchParams.toString();
    const url = queryString ? `/api/nasa-equipment?${queryString}` : "/api/nasa-equipment";
    const res = await fetch(url, {
        ...options,
        method: "GET",
        headers: {
            ...(params?.["X-Forwarded-Host"] != null && {
                "X-Forwarded-Host": params["X-Forwarded-Host"]
            }),
            ...(params?.["X-Forwarded-Preferred-Username"] != null && {
                "X-Forwarded-Preferred-Username": params["X-Forwarded-Preferred-Username"]
            }),
            ...(params?.["X-Forwarded-User"] != null && {
                "X-Forwarded-User": params["X-Forwarded-User"]
            }),
            ...(params?.["X-Forwarded-Email"] != null && {
                "X-Forwarded-Email": params["X-Forwarded-Email"]
            }),
            ...(params?.["X-Request-Id"] != null && {
                "X-Request-Id": params["X-Request-Id"]
            }),
            ...(params?.["X-Forwarded-Access-Token"] != null && {
                "X-Forwarded-Access-Token": params["X-Forwarded-Access-Token"]
            }),
            ...options?.headers
        }
    });
    if (!res.ok) {
        const body = await res.text();
        let parsed: unknown;
        try {
            parsed = JSON.parse(body);
        } catch  {
            parsed = body;
        }
        throw new ApiError(res.status, res.statusText, parsed);
    }
    return {
        data: await res.json()
    };
};
export const listNasaEquipmentKey = (params?: ListNasaEquipmentParams)=>{
    return [
        "/api/nasa-equipment",
        params
    ] as const;
};
export function useListNasaEquipment<TData = {
    data: NasaEquipmentOut[];
}>(options?: {
    params?: ListNasaEquipmentParams;
    query?: Omit<UseQueryOptions<{
        data: NasaEquipmentOut[];
    }, ApiError, TData>, "queryKey" | "queryFn">;
}) {
    return useQuery({
        queryKey: listNasaEquipmentKey(options?.params),
        queryFn: ()=>listNasaEquipment(options?.params),
        ...options?.query
    });
}
export function useListNasaEquipmentSuspense<TData = {
    data: NasaEquipmentOut[];
}>(options?: {
    params?: ListNasaEquipmentParams;
    query?: Omit<UseSuspenseQueryOptions<{
        data: NasaEquipmentOut[];
    }, ApiError, TData>, "queryKey" | "queryFn">;
}) {
    return useSuspenseQuery({
        queryKey: listNasaEquipmentKey(options?.params),
        queryFn: ()=>listNasaEquipment(options?.params),
        ...options?.query
    });
}
export interface GetPredictiveMaintenanceSummaryParams {
    "X-Forwarded-Host"?: string | null;
    "X-Forwarded-Preferred-Username"?: string | null;
    "X-Forwarded-User"?: string | null;
    "X-Forwarded-Email"?: string | null;
    "X-Request-Id"?: string | null;
    "X-Forwarded-Access-Token"?: string | null;
}
export const getPredictiveMaintenanceSummary = async (params?: GetPredictiveMaintenanceSummaryParams, options?: RequestInit): Promise<{
    data: PredictiveMaintenanceSummaryOut;
}> =>{
    const res = await fetch("/api/predictive-maintenance-summary", {
        ...options,
        method: "GET",
        headers: {
            ...(params?.["X-Forwarded-Host"] != null && {
                "X-Forwarded-Host": params["X-Forwarded-Host"]
            }),
            ...(params?.["X-Forwarded-Preferred-Username"] != null && {
                "X-Forwarded-Preferred-Username": params["X-Forwarded-Preferred-Username"]
            }),
            ...(params?.["X-Forwarded-User"] != null && {
                "X-Forwarded-User": params["X-Forwarded-User"]
            }),
            ...(params?.["X-Forwarded-Email"] != null && {
                "X-Forwarded-Email": params["X-Forwarded-Email"]
            }),
            ...(params?.["X-Request-Id"] != null && {
                "X-Request-Id": params["X-Request-Id"]
            }),
            ...(params?.["X-Forwarded-Access-Token"] != null && {
                "X-Forwarded-Access-Token": params["X-Forwarded-Access-Token"]
            }),
            ...options?.headers
        }
    });
    if (!res.ok) {
        const body = await res.text();
        let parsed: unknown;
        try {
            parsed = JSON.parse(body);
        } catch  {
            parsed = body;
        }
        throw new ApiError(res.status, res.statusText, parsed);
    }
    return {
        data: await res.json()
    };
};
export const getPredictiveMaintenanceSummaryKey = (params?: GetPredictiveMaintenanceSummaryParams)=>{
    return [
        "/api/predictive-maintenance-summary",
        params
    ] as const;
};
export function useGetPredictiveMaintenanceSummary<TData = {
    data: PredictiveMaintenanceSummaryOut;
}>(options?: {
    params?: GetPredictiveMaintenanceSummaryParams;
    query?: Omit<UseQueryOptions<{
        data: PredictiveMaintenanceSummaryOut;
    }, ApiError, TData>, "queryKey" | "queryFn">;
}) {
    return useQuery({
        queryKey: getPredictiveMaintenanceSummaryKey(options?.params),
        queryFn: ()=>getPredictiveMaintenanceSummary(options?.params),
        ...options?.query
    });
}
export function useGetPredictiveMaintenanceSummarySuspense<TData = {
    data: PredictiveMaintenanceSummaryOut;
}>(options?: {
    params?: GetPredictiveMaintenanceSummaryParams;
    query?: Omit<UseSuspenseQueryOptions<{
        data: PredictiveMaintenanceSummaryOut;
    }, ApiError, TData>, "queryKey" | "queryFn">;
}) {
    return useSuspenseQuery({
        queryKey: getPredictiveMaintenanceSummaryKey(options?.params),
        queryFn: ()=>getPredictiveMaintenanceSummary(options?.params),
        ...options?.query
    });
}
export interface ListTransformerReadingsParams {
    limit?: number;
    "X-Forwarded-Host"?: string | null;
    "X-Forwarded-Preferred-Username"?: string | null;
    "X-Forwarded-User"?: string | null;
    "X-Forwarded-Email"?: string | null;
    "X-Request-Id"?: string | null;
    "X-Forwarded-Access-Token"?: string | null;
}
export const listTransformerReadings = async (params?: ListTransformerReadingsParams, options?: RequestInit): Promise<{
    data: TransformerReadingOut[];
}> =>{
    const searchParams = new URLSearchParams();
    if (params?.limit != null) searchParams.set("limit", String(params?.limit));
    const queryString = searchParams.toString();
    const url = queryString ? `/api/transformer-readings?${queryString}` : "/api/transformer-readings";
    const res = await fetch(url, {
        ...options,
        method: "GET",
        headers: {
            ...(params?.["X-Forwarded-Host"] != null && {
                "X-Forwarded-Host": params["X-Forwarded-Host"]
            }),
            ...(params?.["X-Forwarded-Preferred-Username"] != null && {
                "X-Forwarded-Preferred-Username": params["X-Forwarded-Preferred-Username"]
            }),
            ...(params?.["X-Forwarded-User"] != null && {
                "X-Forwarded-User": params["X-Forwarded-User"]
            }),
            ...(params?.["X-Forwarded-Email"] != null && {
                "X-Forwarded-Email": params["X-Forwarded-Email"]
            }),
            ...(params?.["X-Request-Id"] != null && {
                "X-Request-Id": params["X-Request-Id"]
            }),
            ...(params?.["X-Forwarded-Access-Token"] != null && {
                "X-Forwarded-Access-Token": params["X-Forwarded-Access-Token"]
            }),
            ...options?.headers
        }
    });
    if (!res.ok) {
        const body = await res.text();
        let parsed: unknown;
        try {
            parsed = JSON.parse(body);
        } catch  {
            parsed = body;
        }
        throw new ApiError(res.status, res.statusText, parsed);
    }
    return {
        data: await res.json()
    };
};
export const listTransformerReadingsKey = (params?: ListTransformerReadingsParams)=>{
    return [
        "/api/transformer-readings",
        params
    ] as const;
};
export function useListTransformerReadings<TData = {
    data: TransformerReadingOut[];
}>(options?: {
    params?: ListTransformerReadingsParams;
    query?: Omit<UseQueryOptions<{
        data: TransformerReadingOut[];
    }, ApiError, TData>, "queryKey" | "queryFn">;
}) {
    return useQuery({
        queryKey: listTransformerReadingsKey(options?.params),
        queryFn: ()=>listTransformerReadings(options?.params),
        ...options?.query
    });
}
export function useListTransformerReadingsSuspense<TData = {
    data: TransformerReadingOut[];
}>(options?: {
    params?: ListTransformerReadingsParams;
    query?: Omit<UseSuspenseQueryOptions<{
        data: TransformerReadingOut[];
    }, ApiError, TData>, "queryKey" | "queryFn">;
}) {
    return useSuspenseQuery({
        queryKey: listTransformerReadingsKey(options?.params),
        queryFn: ()=>listTransformerReadings(options?.params),
        ...options?.query
    });
}
export const version = async (options?: RequestInit): Promise<{
    data: VersionOut;
}> =>{
    const res = await fetch("/api/version", {
        ...options,
        method: "GET"
    });
    if (!res.ok) {
        const body = await res.text();
        let parsed: unknown;
        try {
            parsed = JSON.parse(body);
        } catch  {
            parsed = body;
        }
        throw new ApiError(res.status, res.statusText, parsed);
    }
    return {
        data: await res.json()
    };
};
export const versionKey = ()=>{
    return [
        "/api/version"
    ] as const;
};
export function useVersion<TData = {
    data: VersionOut;
}>(options?: {
    query?: Omit<UseQueryOptions<{
        data: VersionOut;
    }, ApiError, TData>, "queryKey" | "queryFn">;
}) {
    return useQuery({
        queryKey: versionKey(),
        queryFn: ()=>version(),
        ...options?.query
    });
}
export function useVersionSuspense<TData = {
    data: VersionOut;
}>(options?: {
    query?: Omit<UseSuspenseQueryOptions<{
        data: VersionOut;
    }, ApiError, TData>, "queryKey" | "queryFn">;
}) {
    return useSuspenseQuery({
        queryKey: versionKey(),
        queryFn: ()=>version(),
        ...options?.query
    });
}
