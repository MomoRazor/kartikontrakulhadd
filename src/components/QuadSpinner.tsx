import { FunctionComponent } from "react"
import styled, { keyframes, css } from "styled-components"

export interface QuadSpinnerProps {}

const rotate = keyframes({
	from: {
		transform: "rotate(0deg)"
	},
	to: {
		transform: "rotate(360deg)"
	}
})

const Spinner = styled.div(
	() => {
		return {
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			borderWidth: "4px",
			borderStyle: "solid",
			borderColor: "transparent",
			borderRadius: "50%",
            borderTopColor: 'white',
			margin: "auto",
			width: "17px",
			height: "17px",
		}
	},
	css`
		animation: ${rotate} 1s ease infinite;
	`
)

export const QuadSpinner: FunctionComponent<QuadSpinnerProps> = () => {

	return <Spinner/>
}
