import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundaries from "./ErrorBoundaries";

// const Details = (props) => {
//   return (
//     <pre>
//       <code>{JSON.stringify(props, null, 4)}</code>
//     </pre>
//   );
// };

class Details extends React.Component {
  state = { loading: true };

  //   ComponentDidMount is like useEffect,used for Data fetching while use API's
  componentDidMount() {
    // throw new Error("lol new");

    pet.animal(this.props.id).then(({ animal }) => {
      console.log("The Clicked Animal: ", animal),
        this.setState({
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breed,
          loading: false,
        });
    }),
      console.error;
  }
  render() {
    if (this.state.loading) {
      return <h1>loading..</h1>;
    }

    const { animal, breed, location, description, name, media } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
        <button>Adopt {name}</button>
        <p>{description}</p>
      </div>
    );
  }
}
export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundaries>
      <Details {...props} />
    </ErrorBoundaries>
  );
}
