import { Post } from "./post.model";
import { environment } from "../../../environments/environment.prod";
//import { Router, ActivatedRoute } from "@angular/router";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Observable, EMPTY } from "rxjs";
import { catchError, map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PostService {
  baseUrl: string = environment.baseUrl;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "x", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-sucess"],
    });
  }

  read(): Observable<Post[]> {
    const url = `${this.baseUrl}/all`;
    return this.http.get<Post[]>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandle(e))
    );
  }

  create(post: Post): Observable<Post> {
    const url = `${this.baseUrl}/newPosts`;
    return this.http.post<Post>(url, post).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandle(e))
    );
  }

  update(post: Post) {
    const newId = this.filterInt(post.id);
    const url = `${this.baseUrl}/update/${newId}`;
    return this.http.put(url, post).pipe(take(1));
  }

  save(post: Post) {
    if (post.id) {
      return this.update(post);
    }
    return this.create(post);
  }

  loadByID(id: any): Observable<Post> {
    const newId = this.filterInt(id);
    const url = `${this.baseUrl}/find/${newId}`;
    return this.http.get<Post>(url).pipe(take(1));
  }

  errorHandle(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro", true);
    return EMPTY;
  }

  filterInt(value: any) {
    if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) return Number(value);
    return NaN;
  }
}
