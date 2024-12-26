import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItemText,
  Divider,
  Paper,
  Grid,
  styled,
  ListItemButton,
  Collapse,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Navbar from "../Components/Navbar";
import { useNavValueContext } from "../Context/NavValueContext";
import axios from "axios";
import testImage from "../assets/about_pic_1.png";
import { useParams } from "react-router-dom";

const NAVBAR_HEIGHT = "128px";

/*
***************************
  ANIMATIONS  
***************************
*/

const StyledBox = styled(Box)({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #000000, #0a0a0a, #111111)",
  position: "relative",
  "& *": {
    fontFamily: "Kanit, sans-serif",
  },
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
});

const ContentSection = styled(Box)({
  padding: "24px",
  color: "#fff",
});

const SideNavDrawer = styled(Drawer)({
  width: 240,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 280,
    boxSizing: "border-box",
    background: "transparent",
    borderRight: "1px solid rgba(255, 255, 255, 0.12)",
    marginTop: NAVBAR_HEIGHT,
    height: `calc(100% - ${NAVBAR_HEIGHT})`,
  },
});

const RightSideNav = styled(Paper)({
  background: "transparent",
  color: "#fff",
  padding: "16px",
  position: "sticky",
  top: `calc(24px + ${NAVBAR_HEIGHT})`,
  maxHeight: `calc(100vh - ${NAVBAR_HEIGHT} - 48px)`,
  overflowY: "auto",
});

const MainContent = styled(Box)({
  marginTop: NAVBAR_HEIGHT,
  flexGrow: 1,
  padding: "24px",
  marginLeft: 20,
});

const Learn = () => {
  const [openSections, setOpenSections] = useState({ welcome: true }); //section title 
  const [activeSection, setActiveSection] = useState("overview"); //naka highlight na section sa left side navbar
  const [sectionName, setSectionName] = useState("welcome");

  const [cryptoNews, setCryptoNews] = useState([]);
  const [loading, setLoading] = useState(false);

  //If nag click tayo sa footer ng isang link, may corresponding ID siya na isusupply natin sa URL. Para dun na agad siya mag nanavigate or pupunta. Ex: Clinick ko yung What is cryptocurrency sa footer, dito sa part ng learn, dun na siya sa What is crypto currency na section agad mag didirect
  const { sectionID, subSectionName } = useParams();

  const theme = createTheme({
    typography: {
      fontFamily: "'Kanit', sans-serif",
    },
  });

  const {
    totalMarketCap,
    total24hVolume,
    totalCoins,
    totalExchanges,
    top2DominantCoins,
    top2DominantCoinsChange,
    totalMarketCapChange,
  } = useNavValueContext();

  const sections = [
    {
      id: "welcome",
      title: "Welcome",
      subsections: [{ id: "overview", title: "Overview" }],
    },
    {
      id: "blockchain",
      title: "Blockchain",
      subsections: [
        { id: "what-is-crypto", title: "What is Cryptocurrency?" },
        { id: "blockchain", title: "Blockchain Technology" },
        {
          id: "how-to-earn-crypto-currency",
          title: "How To Earn Cryptocurrency?",
        },
      ],
    },
    {
      id: "events",
      title: "Events",
      subsections: [{ id: "latest-news", title: "News" }],
    },
  ];

  const contentData = {
    overview: {
      title: "Overview",
      image: testImage,
      content: [
        {
          id: "introduction",
          title: "Introduction",
          text: "Welcome to the comprehensive guide on cryptocurrency and blockchain technology. This resource will help you understand the fundamentals and advanced concepts in the crypto space.",
        },
        {
          id: "getting-started",
          title: "Getting Started",
          text: "Before diving deep into cryptocurrencies, it's important to understand the basics of digital assets and blockchain technology.",
        },
      ],
    },
    "what-is-crypto": {
      title: "What is Cryptocurrency?",
      image: testImage,
      content: [
        {
          id: "definition",
          title: "Definition",
          text: "Cryptocurrency is a digital or virtual form of currency that uses cryptography for security. Unlike traditional currencies, cryptocurrencies are typically decentralized systems based on blockchain technology.",
        },
        {
          id: "types",
          title: "Types of Cryptocurrencies",
          text: "There are thousands of cryptocurrencies, each with their own unique features and use cases. Bitcoin was the first cryptocurrency and remains the most well-known.",
        },
        {
          id: "benefits",
          title: "Benefits and Risks",
          text: "Cryptocurrencies offer various benefits like decentralization and transparency, but also come with risks such as volatility and security concerns.",
        },
      ],
    },
    blockchain: {
      title: "Blockchain Technology",
      image: testImage,
      content: [
        {
          id: "blockchain-basics",
          title: "Blockchain Basics",
          text: "Blockchain is a distributed ledger technology that underlies most cryptocurrencies. It's a chain of blocks containing information, secured by cryptography and maintained across a network of computers.",
        },
        {
          id: "how-it-works",
          title: "How Blockchain Works",
          text: "Each block contains data, the hash of the previous block, and a timestamp. This creates an immutable chain of information that cannot be altered without changing all subsequent blocks.",
        },
        {
          id: "applications",
          title: "Applications",
          text: "Beyond cryptocurrencies, blockchain technology has applications in supply chain management, healthcare, voting systems, and more.",
        },
      ],
    },
    "how-to-earn-crypto-currency": {
      title: "How To Earn Cryptocurrency?",
      image: testImage,
      content: [
        {
          id: "earn-crypto-overview",
          title: "Overview",
          text: "Cryptocurrency offers unique financial opportunities for anyone with internet access, particularly in the context of passive income. Since the rise of blockchain technology, notably with Axie Infinity in early 2021, interest in earning cryptocurrencies has surged alongside the growth of Web3. This article will explore various methods for generating cryptocurrency.",
        },
      ],
    },
    "latest-news": {
      title: "News",
      image: testImage,
      content: [
        {
          id: "latest-news",
          title: "News",
          text: "Cryptocurrency offers unique financial opportunities for anyone with internet access, particularly in the context of passive income. Since the rise of blockchain technology, notably with Axie Infinity in early 2021, interest in earning cryptocurrencies has surged alongside the growth of Web3. This article will explore various methods for generating cryptocurrency.",
        },
        {
          id: "articles",
          title: "Articles",
          text: "Cryptocurrency offers unique financial opportunities for anyone with internet access, particularly in the context of passive income. Since the rise of blockchain technology, notably with Axie Infinity in early 2021, interest in earning cryptocurrencies has surged alongside the growth of Web3. This article will explore various methods for generating cryptocurrency.",
        },
      ],
    },
  };

  const [currentContent, setCurrentContent] = useState(contentData.overview);

  const ImageContainer = styled(Box)({
    width: "100%",
    height: "200px",
    position: "relative",
    marginBottom: "2rem",
    overflow: "hidden",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  const handleSectionClick = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId], //CLOSES THE SECTION
    }));
  };

  const scrollToSection = (sectionId, sectionName, subSectionId = null) => {
    if (contentData[sectionId]) {
      setActiveSection(sectionId);
      setCurrentContent(contentData[sectionId]);

      if (sectionName) {
        setSectionName(sectionName);
      }

      if (subSectionId) {
        setTimeout(() => {
          const element = document.getElementById(subSectionId);
          if (element) {
            const offset = NAVBAR_HEIGHT.replace("px", "");
            const elementPosition =
              element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - parseInt(offset);

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    }
  };

  //if yung sectionID params is hindi UNDEFINED iseset natin yubg value ng sectionName, activeSection, and openSection sa value ng sectionID sa params
  useEffect(() => {
    
    if(sectionID && subSectionName) {
      setSectionName(sectionID);
      setActiveSection(subSectionName);
      setOpenSections({[sectionID]: true})
      setCurrentContent(contentData[subSectionName])
    }

  }, [sectionID, subSectionName])

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchCryptoNews();
  }, []);

  const fetchCryptoNews = async () => {
    try {
      const cryptoNewsResponse = await axios.get(
        "",
        {
          cache: true,
          signal: AbortSignal.timeout(8000),
        }
      );

      //data exist na
      if (cryptoNewsResponse?.data?.Data) {
        //population
        const newsList = cryptoNewsResponse?.data?.Data?.map((news) => ({
          ...news,
        }));

        setCryptoNews(newsList);
      }

      return [];
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Navbar
        totalMarketCap={totalMarketCap}
        total24hVolume={total24hVolume}
        marketCapChange={totalMarketCapChange}
        totalCoins={totalCoins}
        totalExchanges={totalExchanges}
        top2DominantCoins={top2DominantCoins}
        top2DominantCoinsChange={top2DominantCoinsChange}
      />
      <ThemeProvider theme={theme}>
        <StyledBox>
          <Box sx={{ display: "flex" }}>
            {/* Left Sidebar */}
            <SideNavDrawer variant="permanent" anchor="left">
              <List
                component="nav"
                sx={{
                  color: "white",
                  fontFamily: "Kanit",
                  "& .MuiListItemButton-root": {
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                    },
                  },
                }}
              >
                {sections.map((section) => (
                  <React.Fragment key={section.id}>
                    <ListItemButton
                      onClick={() => handleSectionClick(section.id)}
                    >
                      <ListItemText
                        primary={section.title}
                        sx={{
                          fontFamily: "Kanit",
                        }}
                      />
                      {section.subsections.length > 0 &&
                        (openSections[section.id] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        ))}
                    </ListItemButton>
                    {section.subsections.length > 0 && (
                      <Collapse
                        in={openSections[section.id]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {section.subsections.map((subsection) => (
                            <ListItemButton
                              key={subsection.id}
                              sx={{ pl: 4 }}
                              selected={activeSection === subsection.id}
                              onClick={() =>
                                scrollToSection(subsection.id, section.title)
                              }
                            >
                              <ListItemText
                                primary={subsection.title}
                                sx={{
                                  fontFamily: "Kanit",
                                  "& .MuiTypography-root": {
                                    color:
                                      activeSection === subsection.id
                                        ? "rgba(255, 255, 255, 0.9)"
                                        : "rgba(255, 255, 255, 0.7)",
                                  },
                                }}
                              />
                            </ListItemButton>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </React.Fragment>
                ))}
              </List>
            </SideNavDrawer>
            {/* CENTER CONTENT */}
            <MainContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={9}>
                  <ContentSection>
                    <Typography
                      gutterBottom
                      sx={{
                        color: "#ccc",
                        fontSize: 16,
                        mt: { xs: "auto", md: -5 },
                        mb: { xs: "auto", md: 5 },
                      }}
                    >
                      {sectionName?.charAt(0).toUpperCase() +
                        sectionName?.slice(1)}{" "}
                      {" > "} {currentContent?.title}
                    </Typography>
                    <Typography variant="h4" component="h1" gutterBottom>
                      {currentContent?.title}
                    </Typography>
                    {currentContent?.image && (
                      <ImageContainer>
                        <StyledImage
                          src={currentContent?.image}
                          alt={currentContent?.title}
                          loading="lazy"
                        />
                      </ImageContainer>
                    )}
                    {currentContent?.content.map((section) => (
                      <section key={section?.id} id={section?.id}>
                        <Typography variant="h5" component="h2" gutterBottom>
                          {section?.title}
                        </Typography>
                        <Typography variant="body1" paragraph>
                          {section?.text}
                        </Typography>
                        <Divider
                          sx={{
                            my: 4,
                            backgroundColor: "rgba(255, 255, 255, 0.12)",
                          }}
                        />
                      </section>
                    ))}
                  </ContentSection>
                </Grid>
                {/* Right Sidebar - "On this Page" */}
                <Grid item md={3} sx={{ display: { xs: "none", md: "block" } }}>
                  <RightSideNav>
                    <Typography variant="h6" gutterBottom>
                      On this Page
                    </Typography>
                    <List>
                      {currentContent.content.map((section) => (
                        <ListItemButton
                          key={section.id}
                          onClick={() =>
                            scrollToSection(activeSection, null, section.id)
                          }
                          sx={{
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.08)",
                            },
                          }}
                        >
                          <ListItemText
                            primary={section.title}
                            sx={{
                              fontFamily: "Kanit",
                              "& .MuiTypography-root": {
                                color: "rgba(255, 255, 255, 0.7)",
                                "&:hover": {
                                  color: "rgba(255, 255, 255, 0.9)",
                                },
                              },
                            }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </RightSideNav>
                </Grid>
              </Grid>
            </MainContent>
          </Box>
        </StyledBox>
      </ThemeProvider>
    </Box>
  );
};

export default Learn;
