import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];
  private _searchHistory: string[] = [];
  private apikey: string = '82TDXY2unPNC3K4PwrPaPtgfeUd9ipfo';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) { 
    this.loadLocalStorage();
  }

  get searchHistory(){
    return[...this._searchHistory];
  }

  private organizeHistory(tag:string){

    tag = tag.toLowerCase();

    if ( this._searchHistory.includes(tag) ){ 
      this._searchHistory = this._searchHistory.filter( (oldTag) => oldTag !== tag)
    }

    this._searchHistory.unshift(tag);
    this._searchHistory = this.searchHistory.splice(0,5);
    this.saveLocalStorage();
  }
  
  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._searchHistory));
  }


  private loadLocalStorage():void{
    if( !localStorage.getItem('history')) return;
    this._searchHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._searchHistory.length === 0) return;
    this.searchGifs(this._searchHistory[0]);
  }

  searchGifs(tag:string):void {
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '5')
      .set('q', tag)
      
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(Response => {
        this.gifList = Response.data;
        console.log(Response);
      })
  }

}
