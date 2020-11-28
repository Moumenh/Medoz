import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updategood: false,
            updateprice: false,
            good:this.props.good.good,
            price:this.props.good.price
        }
    }
    handelremove = () => {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: this.props.good._id })
        };
        fetch('http://localhost:4000/goods/delete', requestOptions)
            .then(response => response.json())
            .then((data) => {
                this.props.getgood();
            })
    }

    updategood = ()=>{
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: this.props.good._id, good:this.state.good })
        };
        fetch('http://localhost:4000/goods/update', requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log('data for update',data)
            })
    }

    handelChange = (event)=>{
        const {name,value}=event.target;
        // console.log(value)
        this.setState({[name]:value});
    }

    render() {
        console.log('gooods', this.props.good)
        return (
            <div style={{ display: "flex" }}>
                {
                    this.state.updategood ?
                        <input type="text" name="good" placeholder="enternewgood" onChange={this.handelChange} value={this.state.good}/>
                        :
                        <div>{this.state.good}</div>
                }

                {
                    this.state.updateprice ?
                        <input type="text" name="price" placeholder="enternewgood" onChange={this.handelChange} value={this.state.price} />
                        :
                        <div>{this.state.price}</div>
                }
                <button onClick={this.handelremove} > delete</button>
                
                <button onClick={()=>
                    {
                        if(this.state.updategood){
                            this.updategood()
                        }
                        this.setState({updategood:!this.state.updategood})
                    }
                    }>updateGood</button>
                

                <button onClick={()=>this.setState({updateprice:!this.state.updateprice})}>updateprice</button>
            </div>
        )
    }
}

export default Card;