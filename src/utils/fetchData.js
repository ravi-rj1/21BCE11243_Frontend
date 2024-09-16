import axios from 'axios';

export const fetchTrademarksData = async ({ searchTerm, selectedStatus, selectedItems }) => {
    try {
        const response = await axios.post('https://vit-tm-task.api.trademarkia.app/api/v3/us', {
            input_query: searchTerm,
            input_query_type: "",
            sort_by: "default",
            status: selectedStatus.includes('All') ? [] : selectedStatus,
            exact_match: false,
            date_query: false,
            owners: selectedItems,
            attorneys: [],
            law_firms: [],
            mark_description_description: [],
            classes: [],
            page: 1,
            rows: 10,
            sort_order: "desc",
            states: [],
            counties: []
        }, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3001',
                'Referer': 'http://localhost:3001/',
                'Sec-CH-UA': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                'Sec-CH-UA-Mobile': '?0',
                'Sec-CH-UA-Platform': '"macOS"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
            }
        });
        console.log('data:', response.data);

        const trademarks = response.data.body?.hits?.hits?.map(b => b._source) || [];



        const aggregations = response.data.body?.aggregations || {};
        const owners = aggregations.current_owners?.buckets?.map(b => b.key) || [];
        const lawfirms = aggregations.law_firms?.buckets?.map(b => b?.key) || [];
        console.log('lawfirms:', lawfirms);
        const attorneys = aggregations.attorneys?.buckets?.map(b => b.key) || [];

        const sidebarData = {
            owners,
            lawfirms,
            attorneys
        };

        return { trademarks, sidebarData };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Error fetching data');
    }
};

fetchTrademarksData({ searchTerm: 'check', selectedStatus: ['All'], selectedItems: [] });

