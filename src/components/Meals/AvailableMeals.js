import classes from "./AvailableMeals.moudule.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import {useEffect, useState} from "react";



const AvailableMeals =  () => {
    const [apiMealList,SetApiMealList] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchMeals = async () => {
            const results = await fetch('https://movies-ee0e6-default-rtdb.firebaseio.com/meals.json');
            if(!results.ok){
                throw new Error('something went wrong!');
            }
            const resultsData = await results.json();

            const  loadedMeals = [];

            for(const key in resultsData){
                loadedMeals.push({
                    id: key,
                    name: resultsData[key].name,
                    description: resultsData[key].description,
                    price: resultsData[key].price
                });
            }
            SetApiMealList(loadedMeals);
            setIsLoading(false);
        };
             fetchMeals().catch( error =>{
                 setIsLoading(false);
                 setApiError(error.message);
                 }
             );
             },[]);
    if(apiError){
        return (<section className={classes.MealsError}><p>{apiError}</p></section>)
    }
    if(isLoading){
        return (<section className={classes.MealsLoading}><p>loading.....</p></section>)
    }

    const  mealsList = apiMealList.map(meal => <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        price={meal.price}
        description={meal.description} />);



    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
};

export default AvailableMeals;
