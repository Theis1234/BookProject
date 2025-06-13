import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./home/home.component').then((m) => m.HomeComponent);
        },
    },
    {
        path: 'books',
        loadComponent: () => {
            return import('./book-list/book-list.component').then((m) => m.BookListComponent)
        },
    },
    {
        path: 'authors',
        loadComponent: () => {
            return import('./author/author.component').then((m) => m.AuthorComponent)
        },
    },
    {
        path: 'artists',
        loadComponent: () => {
            return import('./artist/artist.component').then((m) => m.ArtistComponent)
        },
    },
    {
        path: 'covers',
        loadComponent: () => {
            return import('./cover/cover.component').then((m) => m.CoverComponent)
        },
    },
    {
        path: 'login',
        loadComponent: () => {
            return import('./login/login.component').then((m) => m.LoginComponent)
        },
    },
    {
        path: 'artists/edit/:id',
        loadComponent: () => {
            return import('./artist/edit-artist-component/edit-artist.component').then((m) => m.EditArtistComponent)
        },
    },
];
