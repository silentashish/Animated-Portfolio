

import React, { Component } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import styles from './App.module.css';

class ListShuffler extends Component{
  constructor(props) {
    super(props);
    this.state={
      data:[],
      loading:true,
      show:[]
    }
    this.selectItem=this.selectItem.bind(this);
  }

  
  // {
  //   data:['https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
  //   'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
  //   'https://homepages.cae.wisc.edu/~ece533/images/baboon.png',
  //   'https://homepages.cae.wisc.edu/~ece533/images/barbara.bmp',
  //   'https://homepages.cae.wisc.edu/~ece533/images/boat.png',
  //   'https://homepages.cae.wisc.edu/~ece533/images/boy.bmp',
  //   'https://homepages.cae.wisc.edu/~ece533/images/cat.png',
  //   'https://homepages.cae.wisc.edu/~ece533/images/pool.png',
  //   'https://homepages.cae.wisc.edu/~ece533/images/watch.png']
  // }

  componentDidMount() {
    fetch('http://www.json-generator.com/api/json/get/cpnBxavYBK?indent=2')
    .then(response=>response.json())
    .then(responseJson =>
      {
      this.setState({
        data:responseJson.array,
        show:responseJson.array,
        loading:false
      })
      console.log(this.state.data);
    }
    )
  }

  shuffleList = () => {
    const newdata =[...this.state.s,'https://homepages.cae.wisc.edu/~ece533/images/boat.png'] 
    this.setState({
      data:newdata
    })
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

    gridView = () =>{
    return this.state.show.map((item) =>
    {
      return(
        <Flipped key={item} flipId={item.id}>
          <div className={`${styles.column} ${styles.hvrbox}`}>
            <img style={{width:'100%', height:'30vh'}} src={item.photo} alt="" className={styles.hvrboxlayerbottom}/>
            <div>{item.name}</div>
            <div className={`${styles.hvrboxlayertop} ${styles.hvrboxlayerslideup}`}>
              <div className={styles.hvrboxtext}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor ligula porttitor, lacinia sapien non.</div>
            </div>
          </div>
        </Flipped>
      )
    }
    )
  }
  render(){
    return (
            <div className={styles.red}>
              <div className={`${styles.container} ${styles.topBotomBordersOut}`}>
                <a onClick={this.selectAll}>All</a>
                <a onClick={() =>this.selectItem('webdesign')}>Web Design</a>
                <a onClick={() =>this.selectItem('webdev')}>Web Development</a>
                <a onClick={() =>this.selectItem('mobile')}>Mobile</a>
                <a onClick={() =>this.selectItem('graphics')}>Graphics</a>
              </div>
              <div className={styles.row}>
                <Flipper flipKey={this.state.show}>
                  {this.gridView()}
                </Flipper>
              </div>
            
      </div>
    );
  }
};

export default ListShuffler;


