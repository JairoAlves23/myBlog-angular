import { PostService } from "./../post/post.service";
import { Post } from "../post/post.model";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HeaderService } from 'src/app/components/template/header/header.service';

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
    private route: ActivatedRoute,
    private headerService: HeaderService
  ) {
    headerService.headerData = {
      title: "Home",
      icon: "edit",
      routeUrl: "/posts",
      color:"primary"
    };
  }

  ngOnInit(): void {
    this.postService.read().subscribe((posts) => {
      this.posts = posts;
    });
  }

  onEdit(id: any) {
    this.router.navigate(["editar", id], { relativeTo: this.route });
  }
}
