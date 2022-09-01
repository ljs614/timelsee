import { useState, useEffect } from "react";


const jewels = [{unique:'Brutal Restraint', person: 1, min: 500, max: 8000, jewel: [26725, 31683]}];
const br31683 = [55485, 5289, 19144];

const SearchForm = () => {
  const [datas, setDatas] = useState([]);
  
  const postData = async (unique, seed, jewel) => {
    const url = '/MersenneTwister';
    const res = await fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: `unique=${unique}&seed=${seed}&person=1&jewel=${jewel}`,
    })

    return res.json();

  }

  useEffect(() => {
    const searchJewel = jewels[0];
    for(let i=searchJewel.min; i <= 1000; i++) {
      postData(searchJewel.unique, i, searchJewel.jewel[1]).then((data)=>{
        if(!data.datas) {
          return;
        }
        const skills = data.datas.filter(d => br31683.includes(d.skill) && d.typeStats.indexOf('플라스크') > -1).map(d=> d.skill);
        if(skills.length === 0) {
          return;
        }
        setDatas(prev => [
          ...prev,
          {jewel: i, skills}
        ]);
      })
    }
  }, [])

  return (
    <>
    {
      datas.map((data) => (
        <div key={data.jewel}>{`${data.jewel}: ${data.skills}`}</div>
      ))
    }
    </>
    )

}

export default SearchForm;