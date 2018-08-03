import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap/lib';
import me from '../../Assets/img/me.jpg';

class HomePage extends Component {
  render() {
    return (
        
        <div className="overlay">
            <img src={me} className="me" />

            <main className="container-fluid">

                <h1 className="intro">
                    Hey! I'm Phurushotham (Phuru) Shekar.
                </h1>
               
                <p> 
                    I'm Phurushotham
                </p>

                <p> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet vestibulum odio, ut gravida arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse in lacus vel tortor gravida lobortis. Fusce id metus id neque cursus convallis. Suspendisse congue sapien a risus vestibulum varius. Sed vitae metus tempus nisi ornare suscipit. Nullam lacus libero, tristique eget velit sed, venenatis mattis diam. Suspendisse vehicula laoreet magna, ac convallis tellus tempus a. Vestibulum in pulvinar nisi. Sed nec molestie odio. Fusce aliquet iaculis enim, nec malesuada lectus. Phasellus ultricies eu ipsum ut laoreet.

                Cras elementum libero tellus, sit amet vulputate sem sagittis sed. Sed ac velit scelerisque, suscipit velit quis, bibendum ipsum. Nunc sem ex, blandit pretium blandit eu, bibendum id mauris. Aenean rhoncus massa at risus scelerisque, ac lobortis diam laoreet. Suspendisse quis velit eros. Integer sit amet ligula at elit elementum tincidunt a eget felis. Sed in ligula erat. Donec ornare risus ac nibh tempus, id aliquam velit accumsan. Sed vitae posuere arcu, sed eleifend enim. Pellentesque leo lorem, pharetra a odio sit amet, rhoncus dapibus sapien. Proin ut eros eu tortor convallis viverra. Phasellus ac commodo sem, suscipit efficitur lacus. Vivamus luctus, tellus id placerat ornare, tortor odio vestibulum nisl, cursus accumsan dui leo sed lacus. In mi nulla, maximus a tincidunt quis, placerat nec felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam eu enim ac lacus molestie scelerisque.
                
                Aliquam erat volutpat. Vivamus commodo diam risus, quis laoreet lacus porta sit amet. Donec nisl eros, posuere et quam sed, varius fermentum quam. Nunc nec malesuada nisi. Nullam feugiat nulla id dui maximus hendrerit. Phasellus scelerisque suscipit convallis. Aenean aliquam, augue in gravida fermentum, nisi sapien vestibulum arcu, sed molestie turpis ligula ac mi. Vivamus euismod congue aliquet. In tincidunt magna at convallis consequat. Donec consectetur elementum luctus. Pellentesque fringilla tortor non turpis rhoncus rutrum.
                
                Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum dapibus metus eget enim placerat sollicitudin eu vitae lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus finibus est ut pretium efficitur. Integer pharetra tellus eu libero imperdiet, eget accumsan elit pulvinar. Vivamus euismod sollicitudin lorem, a sodales sapien rutrum non. Aliquam eros dolor, vehicula a feugiat ultricies, pharetra vel sapien. Curabitur et est tempus, lobortis lectus eget, interdum odio. Quisque et nisi luctus enim imperdiet fermentum.
                </p>
    
                <ProgressBar active bsStyle="danger" now={"15"} label={"15%"} />

            </main>

        </div>
    );
  }
}

export default HomePage;