# **Crash**

The repository for the Savage Rhinoceroses capstone team

## **Table of Contents**

- [**Crash**](#crash)
  - [**Table of Contents**](#table-of-contents)
  - [**Re-usable UI Components**](#re-usable-ui-components)
  - [**Redux Containers**](#redux-containers)
    - [*General Container Usage*](#general-container-usage)
    - [**Location**](#location)
    - [**Routes**](#routes)
    - [**Stops**](#stops)
    - [**Trip**](#trip)
    - [**Preferences**](#preferences)

## **Re-usable UI Components**

We have developed the following re-usable UI components to be used in several of
our application screens:

- Textual Components:
  - `RobotoText`
    - Displays a plain `Text` component with `fontFamily: 'Roboto'`
    - Accepted props:
      - `style`
      - `children` (via nesting i.e. `<RobotoText>Some Text</RobotoText>`)
  - `TitleText`
    - Displays text intended for the title of a screen
    - Accepted props:
      - `style`
      - `children`
  - `SubTitleText`
    - Displays text intended for the subtitle of a screen
    - Accepted props:
      - `style`
      - `children`
  - `NextButtonText`
    - Displays text intended for the big, red "NEXT" button
    - Accepted props:
      - `style`
      - `children`
- Screen Shell Components:
  - `ScreenShell`
    - Displays a full-screen component with a blue background, no status bar,
      and vertically (and horizontally) centered children
    - Accepted props:
      - `onPress()`
      - `style`
      - `children`
  - `InputScreenShell`
    - Displays a `ScreenShell` with slots for title and subtitle text at the
      top, a "NEXT" button at the bottom, and children in between
    - Accepted props:
      - `titleText`
      - `nextButtonText` - Default value is "NEXT"
      - `clickNext(props)` - Function to call when the "NEXT" button is clicked
        - The props available to the "NEXT" button are provided as an argument
      - `wrap()` - (optional) Container function in which to wrap the "NEXT" button
        - This is useful if you want to have access to global state in `clickNext()`
      - `onPress()`
      - `style`
      - `children`
- Misc:
  - `Buzzer`
    - Takes a list of buzz patterns and triggers, as well as a GTFS `trip` and
      handles buzzing for the given information. If any of the buzz triggers
      have a unit of `percent`, this component also requires the full list of
      `stops` for the current trip
    - Accepted props:
      - `buzzList` - Must be a list of buzz preferences as defined in
        [Preferences](#preferences)
      - `trip` - Must be a GTFS trip as defined in [Trip](#trip)
      - `stops` - Must be a list of stops (for a route and direction) as defined
        in [Stops](#stops)
      - `style`
      - `children`
  - `OBAPicker`
    - Displays a big, white, selection list picker intended for the input
      selection screens
    - Accepted props:
      - `options` - List of selection options
        - Each option must have the form `{ value: string, label: string }`
      - `selected` - The value of the currently selected option
      - `onSelect(value)` - The functino to call when a user updates their
        selection
      - `style` - Styles for the picker's container component
      - `pickerStyle` - Styles for the picker itself
  - `NextButton`
    - Displays a big, red, button intended for the "NEXT" text at the bottom of
      screens
    - Accepted props:
      - `onPress(props)` - The `NextButton`'s props are provided to
        `onPressed()`
      - `style`
      - `children`

## **Redux Containers**

We use redux to manage global application state. We expose the global state in
pieces, as well as providing functions to update global state via the following
container components:

### *General Container Usage*

Each container component we built provides certain props to its child component.
For instance, if I want to build a component that has access to the user's
current GPS location, I will write a component that takes that information in
its `props`. Then, when I want to use the component, I must first wrap it with
the container as follows:

```javascript
const WrappedComponent = Container(Component)

export default function SomeComponent(props) {
  return <WrappedComponent someProp="someValue" />
}
```

In the example above (as is the case with all of our containers), `Container` is
a function that takes a component and returns a component. The component
returned will receive certain props derived from the global state, as well as
any props provided to the wrapped component.

### **Location**

This container exposes GeoLocation data to its child. This container also takes
a `boolean` prop `watchLocation` representing whether or not the child component
should regularly receive location updates or only when it requests them. \
It exposes the following props:

- `location`

  - ```javascript
    {
      timestamp: number,
      coords: {
        longitude: number,
        latitude: number
      },
      error: any
    }
    ```

- `fetchLocation()` - Gets the user's current GeoLocation data
  - This function is provided only if `watchLocation` is `false`

### **Routes**

This container exposes data regarding GTFS routes.

- `selectedRoute`

  - ```javascript
    {
      id: string,
      description: string,
      longName: string,
      shortName: string
    }
    ```

- `routes`

  - ```javascript
    {
      [route.shortName]: {
        id: string,
        description: string,
        longName: string,
        shortName: string
      }
    }
    ```

- `selectRoute(route)` - Sets the selected route
  - This function also fetches stop data for the selected route

### **Stops**

This container provides data regarding GTFS stops associated with a specific
route (and directions).

- `stops`

  - ```javascript
    [
      {
        groupId: string,
        direction: string,
        stops: [
          {
            id: string,
            name: string,
            lat: number,
            lon: number,
          }
        ]
      }
    ]
    ```

- `selectedDirection`: number
  - The index of the selected direction in the `stops` list
- `selectedInitialStop`: number
  - The index of the selected initial stop in the `stops` list for the
    given direction
- `selectedFinalStop`: number
  - The index of the selected final stop in the `stops` list for the
    given direction
- `selectDirection(dir)` - Sets the selected direction
- `selectInitialStop(idx)` - Sets the selected initial stop
- `selectFinalStop(idx)` - Sets the selected final stop

### **Trip**

This container provides data regarding the closest arrival of the
requested route to the requested stop. This container takes a required prop
`tripKey` of type `string`, which should be unique for each instance. This is
done to allow multiple components to interact with different trips.

- `activeTrip` - This is only provided if fetching succeeded (not always true
                  for the other containers)

  - ```javascript
    {
      tripId: string,
      routeId: string,
      distanceFromStop: number,
      numberOfStopsAway: number,
      serviceDate: number,
      stopSequence: number,
      totalStopsInTrip: number,
      scheduledArrivalTime: number,
      predicted: boolean,
      predictedArrivalTime: number,
    }
    ```

- `activeTripError`: string - This is only provided if fetching failed
- `fetchTrip(stopId, routeId)`
  - Attempts to get the closest arrival of the route with id `routeId` to the
    stop with id `stopId`
  - This function only polls the stop for arrivals in the next 60 minutes, and
    will fail if there are no scheduled or predicted arrivals for the requested
    route at the requested stop
- `watchTrip(trip)`
  - Subscribes to updates regarding the status of `trip` every 2 minutes
- `stopWatchTrip()` - Cancels any subscriptions to `trip` updates
  - This function must be called before the subscribed component unmounts, or
    else the application will experience memory leaks

### **Preferences**

This component provides data regarding the user's preferences (either chosen or
default).

- `buzzList` - The list of buzz patterns and their triggers

  - ```javascript
    [
      {
        unit: "stop" | "minute" | "percent",
        value: number,
        buzz: {
          repeat: boolean,
          pattern: number[]
        }
      }
    ]
    ```