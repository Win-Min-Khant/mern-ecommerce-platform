interface Image {
    image_url: string;
    public_alt: string
}

export interface IUser {
    username: string;
    email: string;
    password: string;
    avatar?: Image;
    role: 'customer' | 'admin',
}