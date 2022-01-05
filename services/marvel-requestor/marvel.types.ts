export type ComicFormatType = 'comic' | 'magazine' | 'trade paperback' | 'hardcover' | 'digest' | 'graphic novel' | 'digital comic' | 'infinite comic';
export type ComicOrderByType = 'focDate' | 'onsaleDate' | 'title' | 'issueNumber' | 'modified' | '-focDate' | '-onsaleDate' | '-title' | '-issueNumber' | '-modified';

export type getComicsParams = {
    format?: ComicFormatType;
    formatType?: 'comic' | 'collection';
    noVariants?: boolean;
    dateDescription?: 'lastWeek' | 'thisWeek' | 'nextWeek' | 'thisMonth';
    dateRange?: string
    title?: string;
    titleStartsWith?: string;
    startYear?: number;
    issueNumber?: number;
    orderBy?: ComicOrderByType;
    limit?: number;
    offset?: number;
}

export type getParamsType = {
    timestamp: number;
    hash: string;
}

export type thumbnail = {
    extension: string;
    path: string;
}

export type ComicsResponseType<T> = {
    data: {
        count: number;
        limit: number;
        offset: number;
        results: T;
        total: number;
    }
}

export type ComicType = {
    id: number;
    title: string;
    format: string;
    variantDescription: string;
    characters: object;
    collectedIssues: any[];
    collections: any[];
    creators: {
        available: number;
        items: {
            name: string;
            role: string;
        }[];
    }
    dates: { type: 'onsaleDate' | 'focDate', date: string }[];
    description: string;
    pageCount: number;
    prices: { type: 'printPrice', price: number }[];
    thumbnail: thumbnail
}

export type ComicsType = ComicType[];

export type ComicCharacterType = {
    id: number;
    name: string;
    description: string;
    modified: string;
    thumbnail: thumbnail
}

export type ComicCharactersType = ComicCharacterType[];

export type ComicCreatorType = {
    id: number;
    firstName: string;
    fullName: string;
    lastName: string;
    modified: string;
    thumbnail: thumbnail
}

export type ComicCreatorsType = ComicCreatorType[];