import React, { Component} from 'react'
import "./Testmonial.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
const PreviousBtn=(props)=>{
    const {className, onClick} = props
    return(
        <div className="backwardbtn" onClick={onClick}>
            <ArrowBackIcon style={{color: "#445165"}}/>
        </div>
    )
}
const NextBtn=(props)=>{
    const {className, onClick} = props
    return(
        <div className="forwardbtn" onClick={onClick}>
            
            <ArrowForwardIcon style={{color: "#445165"}}/>
        </div>
    )
}
class Testmonial extends Component {
    constructor(props){
        super(props);
        this.state={
            user : [],
            loading : false,
        }
    }
    
    performAPICall = async () => {
        let response;

        this.setState({
        loading: true,
        });

        try {
        response = await (await fetch('https://testimonialapi.toolcarton.com/api')).json();
        this.setState({ user: response })
        } catch (e) {
        console.log(e);
        }

        this.setState({
        loading: false,
        });
    }
    componentDidMount(){
        this.performAPICall()
    }
    Card = ( use ) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              textAlign: "start",
              color: "#445165",
            }}
          >
            <h1>{use.message}</h1>
            <p style={{fontWeight: 400, fontSize: 25, marginBlockStart: "0.3rem", marginBlockEnd: "0.3rem"}}>
              {use.lorem}
            </p>
            <p style={{display: "flex", flexDirection:"row" }}>
              <div style={{ fontWeight: 500, color: "#445165"}}>{ use.location}</div> , 
              <div style={{marginLeft: "5px"}}>{use.designation}</div>
            </p>
          </div>
        );
      };
      
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
          };
           
        return (
            <div>
                <div className="testmonial">
                    <h5 style={{ color:"#445165", marginBottom: "35px", fontSize: "20px"}}>TESTIMONIALS</h5>
                    <div className="container">
                    <Slider {...settings} 
                    prevArrow={<PreviousBtn/>}
                    nextArrow={<NextBtn />}
                    customPaging={(i)=>{return <div >
                        <Avatar style={{ height: '70px', width: '70px' }} src={this.state.user[i].avatar}  />
                    </div>}} 
                        dotsClass="slick-dots custom-indicator">   
                    {this.state.user.map((use,key) => <div>{this.Card(use)}</div>)}

                    </Slider>
                    </div>
                    
                </div>                
            </div>
        )
    }
}
export default Testmonial;