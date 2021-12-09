import './SearchFilterList.css'
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from "@mui/lab";
import React from "react";
import { Box } from '@mui/system';

interface SearchFilterListProps {
    items: any[]
}

interface SearchFilterListState {
    items: any[]
}

class SearchFilterList extends React.Component<SearchFilterListProps, SearchFilterListState> {
    
    constructor(props: any) {
        super(props);

        this.state = {
            items: props.items ? props.items : []
        };
    }

    selectionChange(event: any) {
        const index = event.target.name.split('-')[1];
        const field = event.target.name.split('-')[2];

        const newState = this.state;
        newState.items[index][field] = event.target.value;

        this.setState(newState);
    }

    keywordChange(index: number, keyword: string) {
        const newState = this.state;
        newState.items[index]['keyword'] = keyword;

        this.setState(newState);
    }

    dateFromChange(index: number, date: string) {
        const newState = this.state;
        newState.items[index]['dateFrom'] = date;

        this.setState(newState);
    }

    dateToChange(index: number, date: string) {
        const newState = this.state;
        newState.items[index]['dateTo'] = date;

        this.setState(newState);
    }

    relationChange(index: number, relation: string | null) {
        const newState = this.state;
        newState.items[index]['relation'] = relation;

        this.setState(newState);
    }

    mapListItem(item: any, index: number) {
            return (
                <li key={'item' + index}>
                    <FormControl className="predicate-control" variant="standard">
                        <Select
                            name={'item-' + index + '-predicate'}
                            label="Predicate"
                            value={item.predicate}
                            displayEmpty
                            placeholder="Predicate"
                            onChange={this.selectionChange.bind(this)}
                        >
                            <MenuItem value=""><em>Predikat</em></MenuItem>
                            <MenuItem value="Alle ord">Alle ord</MenuItem>
                            <MenuItem value="Nøyaktig uttrykk">Nøyaktig uttrykk</MenuItem>
                            <MenuItem value="Delvis uttrykk">Delvis uttrykk</MenuItem>
                            <MenuItem value="Regulært uttrykk">Regulært uttrykk</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className="condition-control" variant="standard">
                        <Select
                            name={'item-' + index + '-condition'}
                            label="Condition"
                            value={item.condition}
                            displayEmpty
                            onChange={this.selectionChange.bind(this)}
                        >
                            <MenuItem value=""><em>Tilstand</em></MenuItem>
                            <MenuItem value="Regulært uttrykk">Regulært uttrykk</MenuItem>
                            <MenuItem value="I tittel">I tittel</MenuItem>
                            <MenuItem value="I beskrivelse">I beskrivelse</MenuItem>
                            <MenuItem value="I årstall">I årstall</MenuItem>
                            <MenuItem value="I forfatternavn">I forfatternavn</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="keyword-control-wrapper">
                        <FormControl className="keyword-control">
                            <Autocomplete
                                disablePortal
                                value={item.keyword}
                                options={["Academic Honesty", "Ethical Research"]}
                                placeholder="Keyword"
                                sx={{ width: 300 }}
                                onChange={((event: any, value: any) => {
                                    this.keywordChange(index, value)
                                }).bind(this)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </FormControl>
                    </div>
                    <FormControl className="mui-datepicker-control">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year']}
                                minDate={new Date('1940-01-01')}
                                maxDate={item.dateTo ? item.dateTo : new Date()}
                                value={item.dateFrom}
                                onChange={((value: any) => {
                                    this.dateFromChange(index, value)
                                }).bind(this)}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box className="mui-datepicker-box" sx={{ display: 'flex', alignItems: 'center' }}>
                                      <input ref={inputRef} {...inputProps} />
                                      {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl className="mui-datepicker-control">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year']}
                                minDate={item.dateFrom ? item.dateFrom : new Date('1940-01-01')}
                                maxDate={new Date()}
                                value={item.dateTo}
                                onChange={((value: any) => {
                                    this.dateToChange(index, value)
                                }).bind(this)}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box className="mui-datepicker-box" sx={{ display: 'flex', alignItems: 'center' }}>
                                      <input ref={inputRef} {...inputProps}/>
                                      {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <div className="search-filter-item-relation">
                        {
                            item.relation === null ? (
                                <div>
                                    <Button variant="outlined" onClick={() => this.relationChange(index, 'Og')}>Og</Button>
                                    <Button variant="outlined" onClick={() => this.relationChange(index, 'Eller')}>Eller</Button>
                                    <Button variant="outlined" onClick={() => this.relationChange(index, 'Ikke')}>Ikke</Button>
                                </div>
                            ) : (<div className="selected-item-relation" onClick={() => this.relationChange(index, null)}>{item.relation}</div>)
                        }
                    </div>
                </li>
            );
        }

    render() {
        const items = this.state.items;

        return (
            <ul>
                {items ? items.map(this.mapListItem.bind(this)) : null}
            </ul>
        );
    }
}

export default SearchFilterList;