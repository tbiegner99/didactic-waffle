export enum CoachTab {
    schedule = 'schedule',
    scores = 'scores',
    availability = 'availability'
}

export enum StudentTab {
    book = 'schedule',
    scores = 'scores'
}

export interface TimeBlock {
    startTime: string;
    endTime: string;
}

export interface CoachAvailability extends TimeBlock {
    availabilityId: string;
    coachId: string;
}

export interface ScheduledBlock extends TimeBlock {
    blockId: string;
    studentId: string;
    coachId: string;
}

export interface CallScore {
    block: ScheduledBlock;
    score: Score;
}

export interface Score {
    blockId: string;
    studentId: string;
    notes: string;
    score: number;
    createdAt: string;
    createdBy: string;
}

export enum LoadingState {
    LOADING = 'loading',
    NOT_LOADED = 'not loaded',
    LOADED = 'loaded'
}

export class LoadedItemFactory {
    static isUnloaded(item: LoadedItem<any>): boolean {
        return item.state === LoadingState.NOT_LOADED;
    }

    static isLoaded(item: LoadedItem<any>) {
        return item.state === LoadingState.LOADED;
    }

    static isLoading(item: LoadedItem<any>) {
        return item.state === LoadingState.LOADING;
    }

    static loading<T>(item?: T): LoadedItem<T> {
        return { item: item || null, state: LoadingState.LOADING };
    }

    static unload<T>(): LoadedItem<T> {
        return { item: null, state: LoadingState.NOT_LOADED };
    }
    static loaded<T>(item: T): LoadedItem<T> {
        return { item, state: LoadingState.LOADED };
    }
}

export interface LoadedItem<T> {
    item?: T | null;
    state: LoadingState;
}
