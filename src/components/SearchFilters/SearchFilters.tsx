import './SearchFilters.css';
import { Button, Paper } from "@mui/material";
import SearchFilterList from '../SearchFilterList';

function SearchFilters() {
    return (
        <div className="search-filters">
            <Paper className="sf-paper" elevation={0}>
                <div className="sf-header">
                    <div className="heading-wrapper">
                        <div className="heading left-heading">FINN MATERIALET SOM INNEHOLDER</div>
                    </div>
                    <div className="heading-wrapper">
                        <div className="heading">I TIDSROMMET</div>
                    </div>
                </div>
                <div className="sf-content">
                    <SearchFilterList items={[{ predicate: '', condition: '', keyword: 'Keyword', dateFrom: null, dateTo: null, relation: null }, { predicate: '', condition: '', keyword: 'Keyword', dateFrom: null, dateTo: null, relation: null }]}/>
                </div>
                <div className="sf-footer">
                    <div className="sf-footer-wrapper">
                        <a className="sf-footer-link" href="#">ENKELSØK</a>
                        <Button className="sf-footer-button" variant="contained">SØK</Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

export default SearchFilters;