# Questions

## 1.- What is the difference between Component and PureComponent? give an example where it might break my app.
Well PureComponent makes superficial comparisons about the change of state, an example is that when comparing objects it only compares references to them, it also changes the way props are handled since they cannot be mutated, and the forceUpdate method has to be called when the data change
How to break this, depends a lot on the application in question.

## 2.- Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
I haven't really had the need to know this, since I'm not very advanced in React, I might as well look it up on the internet right now, but I want to be totally honest. Maybe in the future I can investigate more about this and improve my skills and knowledge.

## 3.- Describe 3 ways to pass information from a component to its PARENT.
Perhaps there are more forms and they are more efficient, but creativity can be used here and the forms that I use are:
- Send variable from parent
- Send a prop that is a function so that it is executed from the child and the parent modifies the variable
- Through Hooks or with shared files that save the state

## 4.- Give 2 ways to prevent components from re-rendering.
La primera sería quitar el StrictMode y así podemos hacer que solo se renderice una única vez.
La segunda sería utilizar React.memo

```bash
const Component = React.memo(props => {
  console.log("Render only one time");
  return <h1>Hi {props.name}!</h1>;
})

```

## 5.- What is a fragment and why do we need it? Give an example where it might break my app.

We use it so as not to add useless tags to the DOM, it is basically a tag in which we can put whatever is inside and we will not have extra things in the DOM. There are two ways to integrate it into components.

Maybe it messes me up a bit, but basically it's not to add too many tags in the DOM
```bash
# Form 1

function App() {
  return (
    <React.Fragment>
      <div></div>
      <div></div>
      <div></div>
      ...
    </React.Fragment>
  );
}

# Form 2
function App() {
  return (
    <>
      <div></div>
      <div></div>
      <div></div>
      ...
    </>
  );
}

```

## 6.- Give 3 examples of the HOC pattern.
```bash
import React, {Component} from 'react';

export default function HocComponent(HocComponent){
    return class extends Component{
        render(){
            return (
                <div>
                    <HocComponent></HocComponent>
                </div>

            );
        }
    } 
}

function HocComponent(HocComponent) {
  return props => {
    return <HocComponent {...props} />
  }
}

import HocComponent from 'route';

const Component = props => <HocComponent />;

```

## 7.- what's the difference in handling exceptions in promises, callbacks and async...await.
They really have a similarity in common, which is that they are directed towards actions in the future.

A callback is something that we send from the beginning and the function that we execute and that receives it will, at the end, call our callback and perform a certain action.

A promise is something that will have 3 states and will do two possible actions when it is resolved, the possible states are in process, resolved and rejected, in the event that it resolves or rejects, it will do a certain action depending on its state.

And async/await are a bit more visual aids and for actions, they help us, for example, to wait for a promise to be fulfilled so that the value we want can have something that works with it and in the end all the code coexists well.

## 8.- How many arguments does setState take and why is it async.
It receives two arguments, in the first the value that we want to start with, and the second is a function in which we can do certain things.

setSate is async because altering the state causes many things to be reprocessed, and this in the end is an operation that can be expensive and make the browser unresponsive, so it is simply for performance issues.

## 9.- List the steps needed to migrate a Class to Function Component.
It really is very simple, you have to remove Class and replace it with function and remove the class extensions and replace with "()"

inside the "()" we will get the props, and we must remove the constructor and the render function, just leave the pure "return" and that's it, our class will migrate to a function

```bash
class Component extends React.Component {
  constructor (props) {

  }
  
  render() {
    return (<p>Hello, World</p>);
  }
  
}

function Component(props) {
  return (<span>Hello, {props.name}</span>)
}
```

## 10.- List a few ways styles can be used with components.
There are many ways to style components.

- Normal CSS (con clases en las etiquetas)
- Inline CSS
- CSS in JS

Also to write styles I use SASS and SCSS

## 11.- How to render an HTML string coming from the server.
Very few times I have used this in React since, according to me, this is not a very good practice because in the end we do not have total control of the HTML that is represented, algunas de las que yo ocupo son:

```bash
<div dangerouslySetInnerHTML={{ __html: <StringHtml> }}>
</div>
```
The way to render an HTML string as HTML is as above, simply with a div with the "dangerouslySetInnerHTML" attribute and an object with the key "__html" and the value is the html string
