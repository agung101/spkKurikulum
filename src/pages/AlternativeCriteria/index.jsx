import Alternative from '../../components/template/Criteria/Alternative'
import Criteria from '../../components/template/Criteria/Criteria'
import './criteria.css'

const AlternativeCriteria = () => {
  return (
    <main id="criteria" className="d-flex gap-4 p-4">
      <Alternative />
      <Criteria />
    </main>
  )
}

export default AlternativeCriteria