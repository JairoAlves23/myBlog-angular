import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "../app/views/home/home.component";
import { PostComponent } from "../app/views/post/post.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "posts",
    component: PostComponent,
  },
  {
    path: "editar/:id",
    component: PostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
