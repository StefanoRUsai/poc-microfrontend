import { mount } from 'helloVue/HelloVueApp'
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

function Vue(props) {
    const ref = useRef(null);

    useEffect(() => {
        mount(ref.current)
    }, [])

    return <div ref={ref} />
}

Vue.propTypes = {}

export default Vue
