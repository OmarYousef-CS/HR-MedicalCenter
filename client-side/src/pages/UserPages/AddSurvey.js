import React, { useEffect, useRef  } from 'react';
import axios from 'axios';
import { url } from '../../utils/tools';
import { useParams } from 'react-router-dom';
import { Box, Stack, Typography, FormControl,  } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import SignatureCanvas from 'react-signature-canvas';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import NavHeader from '../../components/NavHeader';
import { useNavigate } from 'react-router-dom';

function AddSurvey() {
    const navigate = useNavigate();
    const workerId = useParams();

    const [worker, setWorker] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchData = async () => {
        try {
          console.log(workerId)
            setIsLoading(true);
            const workerData = await axios.get(`${url}/workerRoute/${workerId.id}`, { withCredentials: true });
            setWorker(workerData.data);
            console.log(workerData.data)
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error?.response?.status === 401) { navigate('/admin-login') }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [surveyType, setSurveyType] = React.useState(4);
    const [developmentTopic, setDevelopmentTopic] = React.useState('');
    const [desiredGoal, setDesiredGoal] = React.useState('');
    const [assistanceTopic, setAssistanceTopic] = React.useState('');
    const [assistance, setAssistance] = React.useState('');
    const [appraisal, setAppraisal] = React.useState('');
    const [adminAppraisal, setAdminAppraisal] = React.useState('');

    const [responses, setResponses] = React.useState([

      // מקצועיות: 
      { key: 'table10', type: 'title', question: 'מקצועיות'},
      { key: 'table11', type: 'radio', question: 'מדווח בעל פה ובכתב בזמן, באופן עובדתי ברור ומדויק, בהתאם לנדרש.', answer: '' },
      { key: 'table12', type: 'radio', question: 'מתערב ומבצע פעולות הנדרשות ביסודיות ומיומנות לפי צרכי המטופלים.', answer: '' },
      { key: 'table13', type: 'radio', question: 'פעול באופן עצמאי במילוי כל משימותיו. בעל יכולת להתמודדות מקצועית עם מטופלים מורכבים.', answer: '' },
      { key: 'table14', type: 'radio', question: 'מדריך מטופלים ומשפחות בהתאם לכשירות תרבותית באיכות ויעילות.', answer: '' },
      { key: 'table15', type: 'radio', question: 'הערכה מסכמת', answer: '' },
      { key: 'table1Details', type: 'text', question: 'נימוקים, הערות ודוגמאות:', answer: '' },

      // ביצוע משימות ויעילות בעבודה 
      { key: 'table20' , type: 'title', question: 'ביצוע משימות ויעילות בעבודה'},
      { key: 'table21' , type: 'radio', question: 'מסוגל לקבוע סדר עדיפויות, מגלה יכולת תכנון וארגון עבודתו.', answer: '' },
      { key: 'table22' , type: 'radio', question: 'עומד בלו"ז ומשלים המשימות ביעילות ואפקטיביות.', answer: '' },
      { key: 'table23' , type: 'radio', question: 'מקבל החלטות נכונות גם במצבי לחץ או באירועים חריגים.', answer: '' },
      { key: 'table24' , type: 'radio', question: 'מנצל משאבים (ציוד, חומר...) בצורה יעילה ונכונה.', answer: '' },
      { key: 'table25' , type: 'radio', question: 'מפיק לקחים ולומד מטעויות והצלחות ומיישם אותם בעבודה.', answer: '' },
      { key: 'table26' , type: 'radio', question: 'הערכה מסכמת', answer: '' },
      { key: 'table2Details' , type: 'text', question: 'נימוקים, הערות ודוגמאות:', answer: '' },

      // מעורבות, אחריות ויוזמה 
      { key: 'table30', type: 'title', question: 'מעורבות, אחריות ויוזמה'},
      { key: 'table31', type: 'radio', question: 'מגלה יוזמה ואחריות רבה ומקדם נושאים בתחום האחריות.', answer: '' },
      { key: 'table32', type: 'radio', question: 'מגלה נכונות לבצע מטלות נוספות בהתאם לדרישות המחלקה או הממונים.', answer: '' },
      { key: 'table33', type: 'radio', question: 'מערב שותפי תפקיד וגורמים נכונים בהתאם לצרכי העבודה במחלקה.', answer: '' },
      { key: 'table34', type: 'radio', question: 'מקבל ומתמודד טוב עם שינויים במחלקה.', answer: '' },
      { key: 'table35', type: 'radio', question: 'משתתף פעיל בישיבות ומשימות המחלקה בפרט ובית החולים בכלל.', answer: '' },
      { key: 'table36', type: 'radio', question: 'שומר על נאמנות ניהולית ומקצועית ולא עוקף עמיתים וממונים.', answer: '' },
      { key: 'table37', type: 'radio', question: 'מתייחס ל "טעות" או ל "כמעט טעות" ולא נרתע לדווח על כך לממונה.', answer: '' },
      { key: 'table38', type: 'radio', question: 'הערכה מסכמת', answer: '' },
      { key: 'table3Details', type: 'text', question: 'נימוקים, הערות ודוגמאות:', answer: '' },
    
      // יחסי אנוש 
      { key: 'table40', type: 'title', question: 'יחסי אנוש'},
      { key: 'table41', type: 'radio', question: 'סבלני, קשוב, ומתייחס בכבוד למטופל ומשפחתו.', answer: '' },
      { key: 'table42', type: 'radio', question: 'תורם לאווירת עבודה נעימה וחיובית בין הצוות.', answer: '' },
      { key: 'table43', type: 'radio', question: 'מגלה נכונות לעזור לאחרים, לשיתוף פעולה ועבודת צוות.', answer: '' },
      { key: 'table44', type: 'radio', question: 'שומר על יחס טו ותקשורת תקינה בכלל', answer: '' },
      { key: 'table45', type: 'radio', question: 'שומר על יחס טוב ותקשורת תקינה עם הממונים עליו.', answer: '' },
      { key: 'table15', type: 'radio', question: 'הערכה מסכמת', answer: '' },
      { key: 'relationDetails', type: 'text', question: 'נימוקים, הערות ודוגמאות:', answer: '' },

      // סדרי משמעת 
      { key: 'table50', type: 'title', question: 'סדרי משמעת'},
      { key: 'table51', type: 'radio', question: 'מקפיד על נוכחות בהתאם לנדרש, יציאה להפסקות כמקובל.', answer: '' },
      { key: 'table52', type: 'radio', question: 'מתאם חופשות והיעדרויות מראש לפי נהלי בית החולים.', answer: '' },
      { key: 'table53', type: 'radio', question: 'מקפיד על הופעה ייצוגית , מדים נקיים, תג זיהוי.', answer: '' },
      { key: 'table54', type: 'radio', question: 'שומר על אתיקה מקצועית לרות צנעת הפרט וסודיות רפואית.', answer: '' },
      { key: 'table55', type: 'radio', question: 'מגלה פתיחות לקבלת משוב והערכה מהממונה הישיר ומקבל ביקורת באופן ענייני.', answer: '' },
      { key: 'table56', type: 'radio', question: 'משנה את התנהגותו בהתאם למשוב שמקבל מהממונה.', answer: '' },
      { key: 'table57', type: 'radio', question: 'הערכה מסכמת', answer: '' },
      { key: 'table5Details', type: 'text', question: 'נימוקים, הערות ודוגמאות:', answer: '' },

      { key: 'personalAchievements', type: 'text', question: 'הישיגים אישיים, חוזקות (תן דוגמא)', answer: '' },
      { key: 'personalAchievements', type: 'text', question: 'נושאים לשיפור: (ציין התחומים הראויים לשיפור עם דוגמאות):', answer: '' },

    ]);
  
    const workerSign = useRef(null);
    const adminSign = useRef(null); 

    const handleResponseChange = (index, value) => {
        setResponses((prevResponses) => {
          const newResponses = [...prevResponses];
          newResponses[index].answer = value;
          return newResponses;
        });
    };
    
    const handleSubmit = async () => {
      try {
        const adminSignatur = adminSign.current.toDataURL();
        const workerSignatur = workerSign.current.toDataURL(); 

        const formData = {
          type: surveyType,
          workerId: workerId.id,
          developmentTopic,
          desiredGoal,
          assistanceTopic,
          assistance,
          appraisal,
          adminSignatur,
          workerSignatur,
          adminAppraisal,
          responses: responses.map(response => ({
              key: response.key,
              answer: response.answer
          }))
        };
  
        const response = await axios.post(`${url}/workerRoute/submitSurvey/${worker._id}`, formData, { withCredentials: true, responseType: 'blob' });
  
        const url2 = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url2;
        link.setAttribute('download', 'הערכה.pdf');
        document.body.appendChild(link);
        link.click();

        console.log('yes its work');
        navigate(`/user/${workerId.userId}`)
        } catch (error) {
          console.error('Error submitting survey:', error);
        }
    };

    const clearAdminSignatures = () => {
      if (adminSign.current) {
        adminSign.current.clear(); // Clear admin signature
      }
    };
    const clearWorkerSignatures = () => {
      if (workerSign.current) {
        workerSign.current.clear(); // Clear worker signature
      }
    };
  

    return (
        <Box dir='rtl'>
            <NavHeader isLoggedIn={true}/>
            <Typography sx={{ fontWeight: 'bold', fontSize: '26px', textAlign: 'center', marginTop: 1 }}>
                גיליון הערכה ומשוב לצוות
            </Typography>
            <br />

          { isLoading ? (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '75vh' }}> <CircularProgress color="success" size={80} /> </div>) : (
            <>
            <Stack direction='row-reverse' justifyContent='space-between' marginRight={2} marginLeft={2}>
                <Typography marginRight={2} fontWeight='bold'>
                    מס" עובד: {worker?.number}
                </Typography>
                <Typography marginRight={2} fontWeight='bold'>
                    שם פרטי: {worker?.firstName}
                </Typography>
                <Typography marginRight={2} fontWeight='bold'>
                    שם משפחה: {worker?.lastName}
                </Typography>
                <Typography marginRight={2} fontWeight='bold'>
                    מס" ת.ז: {worker?.personalId}
                </Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between' marginRight={2} marginLeft={2}>
                <Typography marginRight={2} fontWeight='bold'>
                    תאריך תחילת עבודה: {worker?.startDate?.day}/{worker?.startDate?.month}/{worker?.startDate?.year}
                </Typography>
                <Typography marginRight={2} fontWeight='bold'>
                    כתובת דוא"ל: {worker?.email}
                </Typography>
                <Typography marginRight={2} fontWeight='bold'>
                    תפקיד: {worker?.role}
                </Typography>
                <Typography marginRight={2} fontWeight='bold'>
                    מחלקה: {worker?.class ? worker.class.name : ''}
                </Typography>
            </Stack>

      <br/>
      <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
        <Typography>סוג ההערכה: </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={surveyType}
          label="Age"
          onChange={(e) => setSurveyType(e.target.value)}
        >
          <MenuItem value={1}>3 חודשים</MenuItem>
          <MenuItem value={2}>6 חודשים</MenuItem>
          <MenuItem value={3}>12 חודש</MenuItem>
          <MenuItem value={4}>כל 6 חודשים</MenuItem>
        </Select>
      </Stack>

      <Typography textAlign="center" fontWeight='bold' fontSize='25px'>
          שאלות
      </Typography>
      <TableContainer component={Paper} dir='rtl'>
        <Table>
          <TableHead sx={{ bgcolor:'#EAEAEA' }}>
            <TableRow>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>שאלה</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>נמוך 1-5</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>סביר 6-7</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>טוב 8</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>טוב מאוד 9</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold' }}>מצויין 10</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responses.map((question, index) => (
              <TableRow key={index}>

                {question.type === 'radio' ? (
                  <>
                  <TableCell align='right' sx={{ fontSize:'15px'}}>{question.question}</TableCell>
                    <TableCell align='right'>
                      <Radio
                        value="מאוד נמוך"
                        checked={question.answer === 'מאוד נמוך'}
                        onChange={() => handleResponseChange(index, 'מאוד נמוך')}
                      />
                    </TableCell>
                    <TableCell align='right'>
                      <Radio
                        value="נמוך"
                        checked={question.answer === 'נמוך'}
                        onChange={() => handleResponseChange(index, 'נמוך')}
                      />
                    </TableCell>
                    <TableCell align='right'>
                      <Radio
                        value="בינוני"
                        checked={question.answer === 'בינוני'}
                        onChange={() => handleResponseChange(index, 'בינוני')}
                      />
                    </TableCell>
                    <TableCell align='right'>
                      <Radio
                        value="גבוה"
                        checked={question.answer === 'גבוה'}
                        onChange={() => handleResponseChange(index, 'גבוה')}
                      />
                    </TableCell>
                    <TableCell align='right'>
                      <Radio
                        value="מאוד גבוה"
                        checked={question.answer === 'מאוד גבוה'}
                        onChange={() => handleResponseChange(index, 'מאוד גבוה')}
                      />
                    </TableCell>
                    </>
                  ) : question.type === 'text' ? (
                    <> 
                      <TableCell align='right' sx={{ fontSize:'15px'}}>{question.question}</TableCell>
                      <TableCell align='right' colSpan={5}>
                        <TextareaAutosize rowsMin={3} cols={50}
                        style={{ width: '90%', minHeight: '100px', resize: 'vertical' }}
                        sx={{ dir: 'rtl', align:'right' }} fullWidth id="outlined-basic" label="תשובה" variant="outlined"
                          value={question.answer} onChange={(event) => handleResponseChange(index, event.target.value)} />
                      </TableCell>
                    </>
                  ) : (
                    <TableCell align='right' sx={{fontWeight: 'bold', fontSize:'17px'}}>{question.question}</TableCell>
                  )}
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
            </TableContainer> <br/>
            <Typography sx={{ fontWeight: 'bold', fontSize: '18px', textAlign: 'center' }}>שאלות כתיבה</Typography>

            <Typography sx={{ fontSize: '15px', textAlign: 'center' }}>יעדים ותכנית פיתוח:(יעדים, תכניות והדרכה) בהסכמה עם העובד:</Typography>
            <Stack direction='row' justifyContent='space-around'>
              <FormControl>
                  <Typography>נושא לשיפור </Typography>
                  <TextareaAutosize rowsMin={3} cols={50}
                      style={{ width: '90%', minHeight: '100px', resize: 'vertical' }}
                      variant="outlined" value={developmentTopic} onChange={(e) => setDevelopmentTopic(e.target.value)} />
              </FormControl>

              <FormControl>
                  <Typography>היעד הרצוי ותאריך להשגה</Typography>
                  <TextareaAutosize rowsMin={3} cols={50}
                      style={{ width: '90%', minHeight: '100px', resize: 'vertical' }}
                      variant="outlined" value={desiredGoal} onChange={(e) => setDesiredGoal(e.target.value)} />
              </FormControl>
            </Stack>

            <Typography sx={{ fontSize: '15px', textAlign: 'center' }}>הסיוע שאני אתן למוערך:</Typography>
            <Stack direction='row' justifyContent='space-around'>
              <FormControl>
                <Typography>נושא לפיתוח</Typography>
                <TextareaAutosize rowsMin={3} cols={50}
                    style={{ width: '90%', minHeight: '100px', resize: 'vertical' }}
                    variant="outlined" value={assistanceTopic} onChange={(e) => setAssistanceTopic(e.target.value)} />
              </FormControl>

              <FormControl>
                <Typography>הסיוע</Typography>
                <TextareaAutosize rowsMin={3} cols={50}
                    style={{ width: '90%', minHeight: '100px', resize: 'vertical' }}
                    variant="outlined" value={assistance} onChange={(e) => setAssistance(e.target.value)} />
              </FormControl>
            </Stack>

            <Stack direction='row' justifyContent='space-between'>
              <Box margin={4}>
                <Typography>התייחסות המוערך: (תגובות, קשיים, ציפיות וכו')</Typography>
                <TextareaAutosize rowsMin={3} cols={50}
                    style={{ width: '90%', minHeight: '100px', resize: 'vertical' }}
                    variant="outlined" value={appraisal} onChange={(e) => setAppraisal(e.target.value)} />
              </Box>

              <Box margin={4}>
                <Typography>התיחסות המעריך: (תגובות, קשיים, ציפיות וכו')</Typography>
                <TextareaAutosize rowsMin={3} cols={50}
                        style={{ width: '90%', minHeight: '100px', resize: 'vertical' }}
                variant="outlined" value={adminAppraisal} onChange={(e) => setAdminAppraisal(e.target.value)} />
              </Box>
            </Stack>


              {/* Signature Box */}
              <Stack justifyContent='space-between' direction='row' margin={5}>
                  <Box>
                  אני מאשר כי תוכן גיליון זה הובא לידיעתי במסגרת שיחת משוב  
                      <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>חתימת עובד:</Typography>
                      <label>
                        <SignatureCanvas
                          penColor="black"
                          canvasProps={{ width: 320, height: 160, className: 'signature-canvas', style: { border: '3px solid black' } }}
                          ref={workerSign}
                        />
                      </label>
                      <Button variant="contained" margin={1} onClick={clearWorkerSignatures}>מחיקה</Button>
                  </Box>
                  <Box>
                  התייחסות וחתימת המערך הישיר
                      <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>חתימת מנהל מחלקה:</Typography>
                      <label>
                        <SignatureCanvas
                          penColor="black"
                          canvasProps={{ width: 320, height: 160, className: 'signature-canvas', style: { border: '3px solid black' } }}
                          ref={adminSign}
                        />
                      </label>
                      <Button margin={1} variant="contained" onClick={clearAdminSignatures}>מחיקה</Button>
                  </Box>
              </Stack>
            <br/>
            <Button variant="contained" color="primary" sx={{ width: '100%', justifyContent: 'center' }} onClick={handleSubmit}>
              שלח
            </Button>
            </>
          ) }
    </Box>
    );
}

export default AddSurvey;
