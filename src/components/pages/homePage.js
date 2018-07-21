import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap/lib';
import me from '../../Assets/img/me.jpg';

class HomePage extends Component {
  render() {
    return (
        
        <div className="overlay">
        <img src={me} className="me" />

            <main className="container-fluid">

                <h1>
                    Welcome!
                </h1>
               
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae ex varius, auctor mi in, condimentum mauris. Mauris dictum eros magna, vitae volutpat tortor tincidunt id. Curabitur eu rhoncus tortor, eu dignissim erat. Sed condimentum erat dolor. Maecenas lobortis neque mi, venenatis ultrices orci posuere a. Vestibulum a felis non mi mattis sagittis. Ut efficitur, sapien quis hendrerit faucibus, lacus erat eleifend quam, consectetur interdum velit felis at nulla. Vivamus pharetra orci et volutpat viverra. Nullam risus erat, consequat rutrum ex eget, ullamcorper sodales sapien. In posuere lacus dui. Quisque velit lectus, efficitur tincidunt consequat in, consequat vitae elit.

Nullam efficitur porttitor tellus quis vulputate. Sed varius dignissim turpis non blandit. Donec congue dolor gravida mauris sagittis, sit amet mattis purus scelerisque. Nunc dapibus nulla eu tellus dignissim, id sodales nulla ornare. Sed mattis gravida tristique. Fusce hendrerit semper risus, sit amet aliquet tellus placerat a. Sed vehicula et tortor at ultrices.

Pellentesque placerat tristique erat, eu pharetra augue facilisis id. Pellentesque condimentum ipsum eu lorem tincidunt, eget fermentum nibh tempus. Aenean vel convallis libero, sed malesuada metus. Nunc quis aliquam nisi. Nam ornare, ligula non pellentesque rhoncus, turpis turpis vulputate nibh, quis commodo elit purus sed tellus. Pellentesque mattis tristique tellus sed dictum. Donec eget orci mauris. Cras ultrices lorem non magna ullamcorper, et mattis quam condimentum. Sed sem mi, sodales eget consequat sed, mattis luctus nunc. Donec blandit sollicitudin ante, vitae pharetra elit interdum bibendum. Etiam cursus, odio nec fringilla malesuada, nunc sapien egestas lacus, a consectetur ex lectus sit amet tortor. Ut a dui sit amet nisl commodo ullamcorper dignissim in dui. Fusce elementum quam eget est lacinia malesuada. Fusce vehicula purus mattis imperdiet pretium. Ut pulvinar metus sit amet ante elementum, pellentesque dapibus purus pellentesque.

Praesent ex sapien, semper nec libero vitae, accumsan tincidunt magna. In ipsum elit, lacinia non porta in, pharetra vel nisl. Sed aliquam lectus pharetra lectus varius, ut volutpat est sollicitudin. Suspendisse venenatis nibh varius pulvinar finibus. Maecenas vulputate faucibus leo sed sollicitudin. Donec suscipit mauris sit amet posuere viverra. Nam et dolor tellus. Cras erat quam, commodo eu lacinia eu, lacinia in enim. Curabitur consequat libero vitae sem aliquet, ut placerat sapien efficitur.

Ut sollicitudin est pharetra, fringilla lacus sed, suscipit sapien. Curabitur ullamcorper mi ut dolor eleifend, at dignissim leo suscipit. Suspendisse sed gravida nibh, sed feugiat ante. Mauris rhoncus, enim quis bibendum efficitur, purus ligula efficitur magna, et bibendum lectus magna quis sem. Maecenas ac bibendum justo. Nam iaculis ante metus. Vivamus finibus consectetur urna, id lobortis justo. In ultricies pellentesque odio ut auctor.
                </p>
    
                <ProgressBar active bsStyle="danger" now={"15"} label={"15%"} />

            </main>

        </div>
    );
  }
}

export default HomePage;