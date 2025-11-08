import { Routes } from "@angular/router";
import { GrammarListComponent } from "./pages/grammar-list/grammar-list.component";
import { GrammarEditComponent } from "./pages/grammar-edit/grammar-edit.component";

export const GRAMMAR_ROUTES : Routes = [
    {path: '', component: GrammarListComponent},
    {path: 'edit', component: GrammarEditComponent},
]