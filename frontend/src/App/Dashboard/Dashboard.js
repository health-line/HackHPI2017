import React, { Component } from 'react';
import {Card, CardActions, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import {List, ListItem} from 'material-ui/List';
import PersonIcon from 'material-ui/svg-icons/social/person';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import AccessibilityIcon from 'material-ui/svg-icons/action/accessibility';
import WCIcon from 'material-ui/svg-icons/notification/wc';
import {ResponsiveContainer, AreaChart, Area, XAxis, YAxis, ReferenceArea, CartesianGrid, Tooltip} from 'recharts';
import './Dashboard.css';
//import users from '../../data/users.json';
import data from '../../data/mocked_data.json';
// import data from '../../data/peak_min-peak_max-steps-data.json';
import datakeys from '../../data/datakeys.json';

class Dashboard extends Component {
	constructor() {
		super();
		this.data = data;
		this.state = {
			selected_datakeys: [],
			selected: []
		};
	}

	componentDidMount() {
		document.addEventListener("DOMContentLoaded", function() {
			Array.from(document.getElementsByClassName("recharts-reference-area-rect")).forEach(item => {
				if(item.nextSibling) {
					const x = parseFloat(item.getAttribute("x"));
					const width = parseFloat(item.getAttribute("width")) / 2;
					item.nextSibling.firstChild.setAttribute("x", width + x);
				}
			});
		});
	}

	isSelected(index) {
		return this.state.selected.indexOf(index) !== -1;
	}

	onRowSelect(selectedRows) {
		console.log(selectedRows);
		let selected_datakeys = [];

		if (selectedRows === "all") {
			datakeys.map((datakey) => {
				selected_datakeys = selected_datakeys.concat([datakey]);
			});
		}
		else if (selectedRows === 'none') {
			selected_datakeys = [];
		}
		else {
			selectedRows.map((selectedRow) => {
				selected_datakeys = selected_datakeys.concat(datakeys[selectedRow]);
			})
		}
		console.log(this.state.selected_datakeys);
		this.setState({
			selected_datakeys: selected_datakeys,
			selected: selectedRows
		});
		console.log(this.state.selected_datakeys);
	}

	render() {
		return (
			<div className="dashboard container">

				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<Card className="h100">
							<CardText>
								<List>
									<ListItem primaryText="John Doe" leftIcon={<PersonIcon />} />
									<ListItem primaryText="46 Jahre" leftIcon={<FavoriteIcon />} />
									<ListItem primaryText="1,75 Meter" leftIcon={<AccessibilityIcon />} />
									<ListItem primaryText="Männlich" leftIcon={<WCIcon />} />
								</List>
							</CardText>
							<CardActions>
								<FlatButton label="Informationen bearbeiten" />
							</CardActions>
						</Card>
					</div>
					<div className="col-xs-12 col-sm-6">
						<Card className="h100">
							<CardText>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHeaderColumn>ID</TableHeaderColumn>
											<TableHeaderColumn>Name</TableHeaderColumn>
											<TableHeaderColumn>Status</TableHeaderColumn>
										</TableRow>
									</TableHeader>
									<TableBody>
										<TableRow>
											<TableRowColumn>1</TableRowColumn>
											<TableRowColumn>John Smith</TableRowColumn>
											<TableRowColumn>Employed</TableRowColumn>
										</TableRow>
										<TableRow>
											<TableRowColumn>2</TableRowColumn>
											<TableRowColumn>Randal White</TableRowColumn>
											<TableRowColumn>Unemployed</TableRowColumn>
										</TableRow>
										<TableRow>
											<TableRowColumn>3</TableRowColumn>
											<TableRowColumn>Stephanie Sanders</TableRowColumn>
											<TableRowColumn>Employed</TableRowColumn>
										</TableRow>
										<TableRow>
											<TableRowColumn>4</TableRowColumn>
											<TableRowColumn>Steve Brown</TableRowColumn>
											<TableRowColumn>Employed</TableRowColumn>
										</TableRow>
										<TableRow>
											<TableRowColumn>5</TableRowColumn>
											<TableRowColumn>Christopher Nolan</TableRowColumn>
											<TableRowColumn>Unemployed</TableRowColumn>
										</TableRow>
									</TableBody>
								</Table>
							</CardText>
						</Card>
					</div>
				</div>

				<div className="row">
					<div className="mt100 col-xs-12">
					<Card className="h100">
						<CardText>
							<ResponsiveContainer height={300}>
								<AreaChart
									data={this.data}
									margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
									<XAxis dataKey="DATE" />
									<CartesianGrid strokeDasharray="3 3" />
									<Tooltip />
									{this.state.selected_datakeys.map((datakey) => {
										return(<YAxis yAxisId={datakey} hide={true} />);
									})}
									{this.state.selected_datakeys.map((datakey) => {
										return (
											<Area type="monotone" dataKey={datakey} yAxisId={datakey} stroke="#8884d8" fill="#8884d8"/>
										);
									})}
								</AreaChart>
							</ResponsiveContainer>
						</CardText>
					</Card>
					</div>
				</div>

				<div className="row">
					<div className="mt100 col-xs-12">
						<Card className="h100">
							<CardText>
								<Table multiSelectable={true} onRowSelection={selectedRows => this.onRowSelect(selectedRows)}>
									<TableHeader>
										<TableRow>
											<TableHeaderColumn>Angezeigte Messreihen</TableHeaderColumn>
										</TableRow>
									</TableHeader>
									<TableBody>

										{datakeys.map((datakey, index) => {
											return(
												<TableRow selected={this.isSelected(index)}>
													<TableRowColumn>{datakey}</TableRowColumn>
												</TableRow>
											);
										})}

									</TableBody>
								</Table>
							</CardText>
						</Card>
					</div>
				</div>

			</div>
		);
	}
}

export default Dashboard;
