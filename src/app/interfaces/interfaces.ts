export interface Token{
    id:string,
    token : string,
}
export interface LoginFormData{
    username:string,
    password:string,
}
export interface UserFormData{
    username : string,
    email:string,
    password?:string,
    firstName?:string,
    lastName?:string,
    avatar?:string,
    birth_date?:string,
}
export interface Song{
    id: string,
    name: string,
    artist: string,
    lyrics?: string,
    file?: string,
    cover?: string,
    publish_date ?: string
}

export interface SongPage{
    size: number,
    current:string,
    sorter: string,
    desc: boolean
}
export interface SongFind{
    phrase: string,
    count: number,
    sorter: string,
    desc: boolean
}
export interface Playlist{
    id:string,
    name: string,
    songs: [
      {
        id: string,
        name: string,
        artist: string,
        lyrics: string,
        file: string,
        cover: string
      }
    ]
}
