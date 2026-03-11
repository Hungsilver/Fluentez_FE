import { Routes } from "@angular/router";
import { GrammarEditComponent } from "./pages/grammar-edit/grammar-edit.component";
import { GrammarComponent } from "./pages/grammar/grammar.component";

export const grammar_router : Routes = [
    {path: '', component: GrammarComponent},
    {path: 'edit', component: GrammarEditComponent},
]
