import { PostService } from "./post.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Post } from "./post.model";
import { HeaderService } from "src/app/components/template/header/header.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"],
})
export class PostComponent implements OnInit {
  post: Post;

  constructor(
    private router: Router,
    private postService: PostService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private headerService: HeaderService
  ) {
    headerService.headerData = {
      title: "Post",
      icon: "storefront",
      routeUrl: "/",
      color:"accent"
    };
  }

  
  form: FormGroup = this.fb.group({
    titulo: [""],
    autor: [""],
    texto: [""]
  });

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;
    if (id) {
      this.postService.loadByID(id).subscribe((post) => {
        this.post = post;
        const { titulo, autor, texto, id } = this.post;
        this.form = this.fb.group({
          id: [id],
          titulo: [titulo],
          autor: [autor],
          texto: [texto]
        });
      });
    }
  }

  savePost(): void {

   this.postService.save(this.form.value).subscribe(() => {
      this.postService.showMessage("Post Criado");
      this.router.navigate(["/"]);
    }); 
  }

}
