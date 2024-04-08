// import { criteriaData } from './data'
// import { useEffect, useState } from 'react'
import Alternative from '../../components/template/Criteria/alternative'
import Criteria from '../../components/template/Criteria/criteria'

const AlternativeCriteria = () => {
  // const [total, setTotal] = useState(0)
  // const [weight, setWeight] = useState([])

  // const getWeight = () => {
  //   let arrWeight = criteriaData.map((item) => item.weight)
  //   setWeight(arrWeight)
  //   getTotal(arrWeight)
  // }

  // const changeWeight = (e) => {
  //   const index = Number(e.target.name.slice(-1))
  //   const newWeight = [...weight]
  //   newWeight[index] = Number(e.target.value)
  //   setWeight(newWeight)
  //   getTotal(newWeight)
  // }

  // const getTotal = (arrWeight) => {
  //   let result = 0
  //   arrWeight.forEach((item) => result += item)
  //   setTotal(result)
  // }

  // useEffect(() => {
  //   getWeight()
  // },[])

  return (
    <main>
      <div className="d-flex gap-4 p-4">
        <Alternative />
        <Criteria />
      </div>

    </main>
  )
}

export default AlternativeCriteria