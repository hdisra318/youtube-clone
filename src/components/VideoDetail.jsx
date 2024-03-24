import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box, Stack, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import {Videos} from './';
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {

    const {id} = useParams();

    const [videoDetail, setVideoDetail] = useState(null);
    const [videos, setVideos] = useState(null);

    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,stadistics&id=${id}`)
            .then(data => setVideoDetail(data.items[0]));

        {/* Related videos */}
        fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
            .then(data => setVideos(data.items));

    }, [id]);

    return (
        <Box minHeight='95vh'>
            <Stack direction={{xs: 'column', lg: 'row'}}>
                <Box flex={2}>
                    <Box sx={{width: '100%', position: 'sticky', top: '86px', paddingBottom: '30px'}}>
                        
                        {/* Video */}
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} 
                            className="react-player" controls />

                        {/* Title */}
                        <Typography color="#fff" variant="h5" fontWeight="bold" p={4}>
                            {videoDetail ? videoDetail.snippet.title : ''}
                        </Typography>

                        <Stack direction='row' justifyContent='space-between' sx={{color: '#fff'}} py={1} px={4}>
                            <Link to={`/channel/${videoDetail ? videoDetail.snippet.channelId : ''}`}>
                                <Typography variant="h6" color='#fff'>
                                    {videoDetail ? videoDetail.snippet.channelTitle: ''}
                                    <CheckCircle sx={{fontSize: '12px', color: 'gray', ml: '5px'}} />
                                </Typography>
                            </Link>


                            <Stack direction="row" gap="20px" alignItems='center'>

                                {/* Views */}
                                <Typography variant="body1" sx={{opacity: 0.7}}>
                                {videoDetail ? parseInt(videoDetail.statistics.viewCount).toLocaleString() : ''} views
                                </Typography>

                                {/* Likes */}
                                <Typography variant="body1" sx={{opacity: 0.7}}>
                                {videoDetail ? parseInt(videoDetail.statistics.likeCount).toLocaleString() : ''} likes
                                </Typography>

                            </Stack>
                        </Stack>

                    </Box>
                </Box>
            
                {/* Related videos */}
                <Box flex={1} px={2} py={{md: 1, xs: 5}} justifyContent="center" alignItems="center">
                    <Videos videos={videos} directio="column" />
                </Box>
            
            </Stack>

        </Box>
    );
}

export default VideoDetail;