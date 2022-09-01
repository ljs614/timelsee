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
    const start = 7000;
    const end = 8000;
    for(let i=start; i <= end; i++) {
        postData(searchJewel.unique, i, searchJewel.jewel[1]).then((data)=>{
          if(!data.datas) {
            return;
          }
          const skills = data.datas.filter(d => br31683.includes(d.skill) && d.typeStats.indexOf('충전량') > -1).map(d=> d.skill);
          if(skills.length < 2) {
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
    <div style={{display:' flex', flexFlow:'wrap'}}>
    {
      datas.map((data) => (
        <div key={data.jewel} style={{padding: '10px', border: '1px solid'}}>{`${data.jewel}: ${data.skills}`}</div>
      ))
    }
    </div>
    )

}

export default SearchForm;