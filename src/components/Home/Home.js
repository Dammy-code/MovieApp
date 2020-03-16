import React from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL,BACKDROP_SIZE,POSTER_SIZE} from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import './Home.css';


class Home extends React.Component{
 
state ={
            movies :[],
            heroImage : null,
            loading: false,
            currentPage: 0,
            totalPages : 0,
            searchTerm : ""
        }
        //use a lifecycle method to reset the states
        componentDidMount(){
            if(localStorage.getItem('HomeState')){
                const state=JSON.parse(localStorage.getItem('HomeState'));
                this.setState({...state});
            }else{
                this.setState({loading:true})
                //fetch your api
                const endpoint =`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
                //pass endpoint as a parameter to a function
               this.fetchItems(endpoint);
            }
            }
          

        searchItems = (searchTerm) => {
            let endpoint = "";
            this.setState({
                movies : [],
                loading : true,
                searchTerm
            })
            if (searchTerm === "") {
                endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
            }else {
                endpoint = `${API_URL}search/movie?api_key=${API_KEY}&langauge=en-US&query=${searchTerm}`;
            }
            this.fetchItems(endpoint);
        }

        loadMoreItems = () => {
           let endpoint =""; /// or let endpoint = "";
           this.setState({loading: true});

            if (this.state.searchTerm === ""){
                endpoint = `${API_URL}movies/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
            }else{
                endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US$query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
            }
            this.fetchItems(endpoint);
        }
       

        //use ES6 module for the fetchItems method
        fetchItems = (endpoint) => {
            fetch(endpoint)
            .then(result => result.json())
            .then(result => {
             console.log(result)
               this.setState({
                   movies :[...this.state.movies, ...result.results],
                   heroImage : this.state.heroImage || result.results[0],
                   loading: false,
                   currentPage:result.page,
                   totalPages: result.total_pages
               },() => {
                   if(this.state.searchTerm=== ""){
                   localStorage.setItem('HomeState' , JSON.stringify(this.state));//this enables use to save data in our local storage.
                }
                })
            })
            //ES6 allows fetch to call the url and return something called promise
            //in order to wait for the result from promise, use .then
            //result was converted to a json file because it contained raw data
           .catch(error => console.error("Error:" , error))
        }
   
    render(){
    return(
            <div className="rmdb-home"> 
            {this.state.heroImage ? // if the image exist, render the second div, if not render null.
                <div>
                <HeroImage
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`} 
                title={this.state.heroImage.original_title}
                text={this.state.heroImage.overview}
                />
                <SearchBar callback = {this.searchItems}/> 
              </div> : null }
<div className="rmdb-grid-content">
    <FourColGrid 
            header= {this.state.searchTerm ? 'Search Result' : 'Popular Movies'}
            loading ={this.state.loading}
            >
                {this.state.movies.map ((element, i) => {
                 return  <MovieThumb
                    key={i}
                    clickable={true}
                    image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : ` ./images/no_image.jpg`}
                    movieId={element.id}
                    movieName={element.original_title}
                    />
                })}
            </FourColGrid>
            <br/> <br/>
            {this.state.loading ? <Spinner /> : null}
            {(this.state.currentPage <= this.state.totalPages && !this.state.loading) ?
            <LoadMoreBtn text = "Load More" onClick = {this.loadMoreItems} />
        : null}
            </div>
         
            </div>
        )
    }
}



export default Home;