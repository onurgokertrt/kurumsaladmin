export interface Meal {
    id: number,
    tarihi: string,
    bolgeler: string,
    yemekcesidi1: string,
    yemekcesidi2: string,
    yemekcesidi3: string,
    yemekcesidi4: string,
    yemekcesidi5: string,
    yemekcesidi6: string,
    yemekcesidi7: string
}

export interface MealList {
    date: string,
    city: string | null,
    meal: string[]
}