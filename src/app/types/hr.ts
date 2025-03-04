export interface HR { 
    id: string, 
    title: string, 
    location: string, 
    date: string, 
    department: {
        name: string,
    };
    status: string, 
    url: string 
}
