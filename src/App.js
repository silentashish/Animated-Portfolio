import React from 'react';
import styles from './App.module.css';
import Masonry from 'react-masonry-component';

const masonryOptions = {
  transitionDuration: 0
};

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      data:[],
      loading:true,
      show:[]
    }
    this.selectItem=this.selectItem.bind(this);
  }

  componentDidMount() {
    fetch('http://www.json-generator.com/api/json/get/cpMYlZcDuG?indent=2')
    .then(response=>response.json())
    .then(responseJson =>
      this.setState({
        data:responseJson.array,
        show:responseJson.array,
        loading:false
      })
    )
  }
  
  gridView = () =>{
    return this.state.show.map((item) =>
    {
      return(
        <div className={`${styles.column} ${styles.hvrbox}`}>
          <img style={{width:'100%', height:'30vh'}} src={item.photo} alt="" className={styles.hvrboxlayerbottom}/>
          <div>{item.name}</div>
          <div className={`${styles.hvrboxlayertop} ${styles.hvrboxlayerslideup}`}>
            <div className={styles.hvrboxtext}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor ligula porttitor, lacinia sapien non.</div>
          </div>
        </div>
        // <div className={styles.column}>
        //   <div className={styles.content}>
        //     <img style={{width:'100%', height:'25vh'}} src={item.photo} alt="Mountains"s/>
        //     <h3>{item.name}</h3>
        //   </div>
          
        //   <div className={styles.detail}>
        //     <div>I am a text</div>
        //     <div>I carry Information</div>
        //   </div>
        // </div>
      )
    }
    )
  }

  selectAll = () =>{
    this.setState({
      show:this.state.data
    })
  }

  selectItem = (type) =>{
    var arr = [];
    this.state.data.map( item => {
      if(item.tag === type){
        arr = [...arr, item]
      }
    })
    this.setState({
      show:arr
    })
  }

  

  render(){
    if(this.state.loading){
      return(
        <div>Loading...</div>
      )
    }
    return(
      <div className={styles.red}>

        <div className={`${styles.container} ${styles.topBotomBordersOut}`}>
          <a onClick={this.selectAll}>All</a>
          <a onClick={() =>this.selectItem('webdesign')}>Web Design</a>
          <a onClick={() =>this.selectItem('webdev')}>Web Development</a>
          <a onClick={() =>this.selectItem('mobile')}>Mobile</a>
          <a onClick={() =>this.selectItem('graphics')}>Graphics</a>
        </div>

        <div className={styles.row}>
          <Masonry>
            {this.gridView()}
          </Masonry>
        </div>    
          
        </div>
    )
  }
}