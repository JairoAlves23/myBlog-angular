import { PostService } from "./../post/post.service";
import { Post } from "../post/post.model";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  posts: Post[];

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.postService.read().subscribe((posts) => {
      this.posts = posts;
    });
  }

  onEdit(id: any) {
    this.router.navigate(["editar", id], { relativeTo: this.route });
  }
}
