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
  Card,
  CardMedia,
  CardContent,
  Avatar,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Navbar from "../Components/Navbar";
import { useNavValueContext } from "../Context/NavValueContext";
import axios from "axios";
import testImage from "../assets/about_pic_1.png";
import { useParams } from "react-router-dom";
import NewsSlider from "../Components/NewsSlider";
import ScrollToTop from "../Components/ScrollToTop";
import NewsFeedsTable from "../Components/Tables/NewsFeedsTable";
import Aos from "aos";

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
  const [openSections, setOpenSections] = useState({ welcome: true }); //nakaopen na section sa gilid (ex: welcome section)
  const [activeSection, setActiveSection] = useState("overview"); //naka highlight na section sa left side navbar
  const [contentTitle, setContentTitle] = useState("welcome"); //content title for guide (ex: Welcome > Overview) where the title is "Welcome"

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
          title: "Intoduction",
          text: "Cryptocurrency is a form of digital or virtual currency that uses cryptography for security, making it difficult to counterfeit or double-spend. The most well-known cryptocurrency is Bitcoin, but there are thousands of others, each with unique features and uses. Blockchain technology, which underpins most cryptocurrencies, is a decentralized system that records transactions across a network of computers. This ensures transparency, security, and integrity without the need for intermediaries like banks. As the crypto market evolves, new trends such as decentralized finance (DeFi), non-fungible tokens (NFTs), and smart contracts are gaining attention. However, it’s important to note that the crypto space is highly volatile and speculative, with prices fluctuating rapidly due to market sentiment, technological advancements, and regulatory changes. This section will introduce you to key concepts such as wallets, exchanges, mining, and the difference between various types of cryptocurrencies. We’ll also provide insight into how to stay informed and make wise investment decisions. Remember, while the potential for growth in the crypto world is substantial, it is crucial to conduct thorough research and assess your risk tolerance before investing. Always adhere to the principle of 'Do Your Own Research' (DYOR) to make informed choices in this ever-changing landscape.",
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
          text: "Cryptocurrency is a type of digital or virtual currency that relies on cryptography to secure transactions, control the creation of new units, and verify the transfer of assets. Unlike traditional fiat currencies such as the dollar or euro, which are issued and regulated by central banks, cryptocurrencies operate on decentralized networks, primarily built on blockchain technology. A blockchain is a distributed ledger maintained by a network of computers, or nodes, that work together to ensure the integrity and security of the system. This decentralization eliminates the need for intermediaries, such as banks or governments, and allows for peer-to-peer transactions across the globe. Cryptocurrencies can be used for various purposes, including online purchases, remittances, investments, and even as a means of transferring value across borders without the need for traditional financial institutions. Popular cryptocurrencies like Bitcoin, Ethereum, and Litecoin have garnered attention due to their ability to provide faster, cheaper, and more secure transactions. However, the value of cryptocurrencies can be volatile, and the space remains subject to evolving regulations and technological advancements.",
        },

        {
          id: "history",
          title: "History of Cryptocurrency",
          text: "The concept of cryptocurrency can be traced back to the 1980s when cryptographer David Chaum introduced the idea of digital cash through his invention of DigiCash, a form of encrypted electronic money. This laid the groundwork for future developments in secure digital transactions. However, it wasn’t until 2009 that cryptocurrency truly emerged as a revolutionary concept with the creation of Bitcoin. Developed by the anonymous individual or group known as Satoshi Nakamoto, Bitcoin introduced blockchain technology, a decentralized ledger system that underpins most cryptocurrencies today. Since its inception, Bitcoin has inspired the creation of thousands of other cryptocurrencies and has become a symbol of the evolving financial landscape.",
        },
        {
          id: "types",
          title: "Types of Cryptocurrencies",
          text: "There are thousands of cryptocurrencies in existence, each with its unique features, purposes, and technological innovations. Here are some of the most notable types:\n\n● Bitcoin (BTC): The first cryptocurrency, often referred to as digital gold, known for its pioneering role in blockchain technology.\n\n● Ethereum (ETH): A blockchain platform that supports smart contracts and decentralized applications (dApps).\n\n● Litecoin (LTC): Often considered the silver to Bitcoin’s gold, designed for faster transaction speeds.\n\n● Ripple (XRP): Focused on facilitating cross●border payments with minimal transaction fees.\n\n● Tether (USDT): A stablecoin pegged to the value of fiat currencies like the US dollar, designed to reduce volatility.\n\n● Binance Coin (BNB): Originally created to support transactions on the Binance Exchange but has since expanded its use cases.\n\n● Cardano (ADA): Known for its focus on sustainability and scalability through a research-driven approach.\n\nThese are just a few examples, as the cryptocurrency market continues to grow and evolve, introducing new innovations and use cases. That is why doing your own research is a must.",
        },
        {
          id: "benefits",
          title: "Benefits and Risks",
          text: "Cryptocurrencies offer a range of benefits and opportunities, making them an appealing option for many users, but they also come with significant risks that should not be overlooked. On the benefits side, cryptocurrencies provide decentralization, removing the need for intermediaries like banks or governments, which can lead to faster, cheaper transactions and increased financial inclusion. Additionally, blockchain technology ensures transparency and security by recording transactions on a tamper-proof ledger. Cryptocurrencies also enable access to global markets and investment opportunities. However, risks include high volatility, as prices can fluctuate dramatically within short periods, leading to potential losses. Security concerns such as hacking, scams, and the irreversibility of transactions add another layer of risk. Furthermore, the regulatory environment is still evolving, and unclear or inconsistent regulations can create uncertainty for investors and users alike.",
        },
        {
          id: "regulation",
          title: "Regulation",
          text: "The regulatory landscape for cryptocurrencies varies widely across the globe, reflecting the diverse perspectives of governments and financial authorities on this emerging technology. In some countries, cryptocurrencies are fully embraced and integrated into the financial system. For instance, nations like El Salvador have even adopted Bitcoin as legal tender, aiming to boost economic growth and financial inclusion. Other countries, such as Switzerland, have established clear regulatory frameworks to encourage innovation while ensuring investor protection. Conversely, some nations impose strict regulations or outright bans on cryptocurrencies due to concerns about financial stability, money laundering, and fraud. For example, China has banned all cryptocurrency-related activities, including mining and trading. Meanwhile, the United States and the European Union continue to work on developing comprehensive policies that balance innovation with security and compliance. As the cryptocurrency market matures, global regulatory efforts are likely to increase, impacting how cryptocurrencies are used and adopted.",
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
          text: "Blockchain is a groundbreaking distributed ledger technology that serves as the foundation for most cryptocurrencies. \n\nAt its essence, blockchain is a decentralized and transparent system \nthat allows information to be recorded, stored, and secured across a network of computers. \n\nUnlike traditional centralized systems, blockchain eliminates the need for intermediaries, \nrelying instead on cryptographic algorithms and consensus mechanisms to maintain integrity and trust. \n\nEach participant in the network holds a copy of the entire ledger, \nensuring that data remains resilient against single points of failure or tampering. \n\nThis innovative approach has transformed industries by offering unparalleled levels of security, \naccountability, and efficiency.",
        },
        {
          id: "how-it-works",
          title: "How Blockchain Works",
          text: "Blockchain operates through a sequence of interconnected blocks, \neach containing essential components that ensure its immutability and security. \n\nEvery block comprises three key elements: \ndata (specific to the transaction or record), \na cryptographic hash (a unique identifier for the block), \nand the hash of the previous block, which links it to the chain. \n\nThis structure ensures that even the smallest modification to a block \nwould disrupt the chain, making tampering virtually impossible without altering all subsequent blocks. \n\nFurthermore, blockchain employs consensus mechanisms, such as Proof of Work (PoW) or Proof of Stake (PoS), \nto validate new blocks and secure the network. \n\nThe decentralized nature of blockchain, combined with its cryptographic safeguards, \nensures that information is both transparent and resistant to unauthorized changes.",
        },
        {
          id: "applications",
          title: "Applications",
          text: "Blockchain technology is not limited to powering cryptocurrencies like Bitcoin and Ethereum; \nit has far-reaching applications across diverse industries, reshaping traditional processes. \n\nIn supply chain management, blockchain provides end-to-end visibility, \nallowing companies to trace the journey of goods from origin to destination. \n\nIn healthcare, it enhances data security and enables seamless sharing of patient records among authorized stakeholders. \n\nVoting systems benefit from blockchain's ability to offer transparent, auditable, and tamper-proof elections, \nrestoring public trust in democratic processes. \n\nOther notable applications include financial services, where blockchain streamlines cross-border payments and reduces settlement times. \nReal estate transactions are made more efficient through smart contracts, \nwhile energy markets leverage blockchain to facilitate peer-to-peer energy trading. \n\nThe versatility of blockchain continues to inspire innovation across industries, \npromising to reshape the way we conduct business and interact with technology.",
        },
        {
          id: "future",
          title: "Future of Blockchain",
          text: "The future of blockchain technology is brimming with potential, \npoised to address current challenges and unlock new opportunities for global industries. \n\nScalability remains a primary focus, with emerging solutions like sharding and layer-two protocols \nexpected to enable blockchains to handle millions of transactions per second. \n\nInteroperability is another area of advancement, with projects aiming to create seamless communication \nacross different blockchain networks, fostering a more interconnected ecosystem. \n\nMoreover, the integration of blockchain with other cutting-edge technologies, \nsuch as artificial intelligence (AI), machine learning, and the Internet of Things (IoT), \nis expected to drive transformative changes. \n\nFor instance, AI-powered algorithms could enhance blockchain analytics, \nwhile IoT devices could leverage blockchain for secure and autonomous data exchange. \n\nAs industries continue to adopt blockchain solutions, \nregulatory frameworks and global standards will play a critical role in fostering trust and adoption. \n\nThe journey of blockchain technology is only beginning, \nand its potential to revolutionize how we interact with data, assets, and each other \nwill likely continue to grow exponentially in the coming decades.",
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
          text: "Cryptocurrency offers unique financial opportunities to anyone with an internet connection, providing a decentralized alternative to traditional financial systems. \n\nOne of the most exciting aspects of cryptocurrency is its potential for generating passive income. \nSince the advent of blockchain technology and the rise of innovative platforms like Axie Infinity in early 2021, \ninterest in earning cryptocurrency has grown exponentially. \n\nThis growth aligns with the broader adoption of Web3 technologies, \nushering in a new era of decentralized applications and financial ecosystems. \n\nWhether you're a tech-savvy investor or a casual user looking to explore the space, \nthis article will delve into some of the most popular and effective methods to generate cryptocurrency, \nranging from mining and staking to trading and participating in airdrops.",
        },
        {
          id: "mining",
          title: "Mining",
          text: "Mining is the foundational process that underpins many cryptocurrency networks, particularly those based on Proof of Work (PoW) consensus mechanisms, such as Bitcoin and Ethereum (prior to its transition to Proof of Stake). \n\nIn essence, mining involves solving complex cryptographic puzzles to validate transactions and add new blocks to the blockchain. \n\nMiners compete to solve these puzzles, and the first to succeed earns a reward in the form of newly minted cryptocurrency and transaction fees from the block. \n\nHowever, mining is not without its challenges. \nIt requires significant computational power, specialized hardware (like ASICs or GPUs), and substantial energy consumption. \n\nAs a result, mining is often dominated by large-scale operations with access to low-cost electricity, making it less accessible for individual miners. \n\nDespite these barriers, mining remains one of the oldest and most reliable ways to earn cryptocurrency, contributing to the security and decentralization of blockchain networks.",
        },
        {
          id: "staking",
          title: "Staking",
          text: "Staking is a popular and eco-friendly alternative to mining, particularly on blockchain networks that use a Proof of Stake (PoS) or similar consensus mechanism. \n\nStaking involves holding a specific amount of cryptocurrency in a wallet or on a platform to participate in the network's operations. \nStakers help secure the network and validate transactions, \nplaying a crucial role in maintaining the blockchain's integrity. \n\nIn return for their contribution, stakers receive rewards in the form of additional cryptocurrency, \noften proportional to the amount they stake and the duration of their participation. \n\nStaking is more accessible than mining, as it does not require expensive hardware or high energy consumption. \nMany exchanges and platforms, such as Binance and Coinbase, \nhave introduced staking services, making it easier for users to participate without managing their own wallets or technical setups. \n\nAs blockchain networks continue to evolve, staking is becoming a cornerstone of decentralized finance (DeFi), offering users a reliable source of passive income.",
        },
        {
          id: "airdrops",
          title: "Airdrops",
          text: "Airdrops are a marketing strategy employed by cryptocurrency projects to distribute tokens to users, often for free, \nto increase awareness, adoption, and engagement with their platform. \n\nThese giveaways can be targeted at existing holders of a specific cryptocurrency, \nor they may be distributed to users who complete certain tasks, such as following social media accounts, joining communities, or sharing content. \n\nAirdrops serve multiple purposes for the project, including building a loyal user base, generating buzz, and encouraging token usage within their ecosystem. \n\nFor users, airdrops provide an opportunity to acquire new tokens without any upfront investment. \nHowever, not all airdrops are created equal. \nSome may have genuine utility and long-term value, while others might be speculative or tied to low-quality projects. \n\nIt's essential to exercise caution and verify the legitimacy of airdrops to avoid potential scams. \nDespite the risks, airdrops remain a popular method of earning cryptocurrency, especially for newcomers to the space.",
        },
        {
          id: "trading",
          title: "Trading",
          text: "Cryptocurrency trading involves buying and selling digital assets on various platforms, \nleveraging price fluctuations to generate profits. \n\nThis method of earning cryptocurrency is highly dynamic and appeals to users who enjoy analyzing markets, \nmonitoring trends, and making informed decisions based on data. \n\nTrading strategies vary widely, ranging from day trading and scalping to swing trading and long-term holding (HODLing). \nEach strategy carries its own level of risk and requires a different set of skills, \nsuch as technical analysis, market research, and emotional discipline. \n\nThe availability of decentralized exchanges (DEXs) and centralized exchanges (CEXs) \nhas made trading accessible to users worldwide, providing a wide range of cryptocurrencies to trade. \n\nWhile trading can be lucrative, it also comes with significant risks due to the volatility of cryptocurrency markets. \nTraders need to stay updated on market conditions, project developments, and regulatory changes to navigate this fast-paced environment successfully. \n\nFor those willing to invest time and effort into mastering the art of trading, \nit can be a rewarding way to earn cryptocurrency while actively participating in the market.",
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
          text: "Stay updated with the latest news in the cryptocurrency world. From regulatory changes to technological advancements, this section covers all the important updates.",
        },
        {
          id: "top-news-feeds",
          title: "Top News Feeds",
          text: "Get insights from top news feeds in the crypto space. This section aggregates news from various reputable sources to keep you informed about the latest trends and developments.",
        },
      ],
    },
  };

  const [currentContent, setCurrentContent] = useState(contentData.overview);

  const ImageContainer = styled(Box)({
    width: "100%",
    height: "300px",
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

  const scrollToSection = (sectionId, contentTitle, subSectionId = null) => {
    /**
     * Section Id => ID from the section array
     * Content Name => Content title
     * */

    //we check if meron content based sa section ID na pinasa
    if (contentData[sectionId]) {
      //setting the position of the page back to 0,0 para laging nag rereset sa pinaka taas per pili ng section
      window.scrollTo(0, 0);

      setActiveSection(sectionId);
      setCurrentContent(contentData[sectionId]); //setting the current content na ididisplay sa main container using the section id itself

      //checking if there is a section name being passed, so I can use it for the step visualized ex. Welcome > Overview where the content name is the content's title

      //the reason why naka IF statement ito is that, same function kasi yung tinatawag kapag namimili ng section, ang nangyayari is imbis na napapalitan yung sa Content Name na Welcome > Overview, nagiging static siya, kahit hindi under ng Welcome yung topic na nakadisplay is Welcome pa din yung nakalagay
      if (contentTitle) {
        setContentTitle(contentTitle);
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
    if (sectionID && subSectionName) {
      setContentTitle(sectionID);
      setActiveSection(subSectionName);
      setOpenSections({ [sectionID]: true });
      setCurrentContent(contentData[subSectionName]);
    }
  }, [sectionID, subSectionName]);

  useEffect(() => {
    Aos.init();
    window.scrollTo(0, 0);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  //refreshes the fetching of crypto news to get the latest news
  useEffect(() => {
    let refreshNews = setInterval(() => {
      fetchCryptoNews();
    }, 30000);

    return () => clearTimeout(refreshNews);
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
      {/* When the browser is being refreshed, nawawala yung value nung nasa navBar kaya if 0 get the value from the localStorage instead */}
      {totalMarketCap === 0 ? (
        <Navbar
          totalMarketCap={localStorage.getItem("totalMarketCap")}
          total24hVolume={localStorage.getItem("total24hVolume")}
          marketCapChange={localStorage.getItem("totalMarketCapChange")}
          totalCoins={localStorage.getItem("totalCoins")}
          totalExchanges={localStorage.getItem("totalExchanges")}
          top2DominantCoins={localStorage.getItem("top2DominantCoins")}
          top2DominantCoinsChange={localStorage.getItem(
            "top2DominantCoinsChange"
          )}
        />
      ) : (
        <Navbar
          totalMarketCap={totalMarketCap}
          total24hVolume={total24hVolume}
          marketCapChange={totalMarketCapChange}
          totalCoins={totalCoins}
          totalExchanges={totalExchanges}
          top2DominantCoins={top2DominantCoins}
          top2DominantCoinsChange={top2DominantCoinsChange}
        />
      )}
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
                      data-aos="fade-right"
                      gutterBottom
                      sx={{
                        color: "#ccc",
                        fontSize: 16,
                        mt: { xs: "auto", md: -5 },
                        mb: { xs: "auto", md: 5 },
                      }}
                    >
                      {contentTitle?.charAt(0).toUpperCase() +
                        contentTitle?.slice(1)}
                      {" > "}
                      {currentContent?.title}
                    </Typography>

                    {currentContent?.title === "News" ? (
                      <>
                        <Typography
                          variant="h4"
                          component="h1"
                          gutterBottom
                          data-aos="fade-right"
                          data-aos-delay="200"
                        >
                          {currentContent?.title}
                        </Typography>
                        {/* NEWS BOXES */}
                        <NewsSlider news={cryptoNews} />
                        <Divider
                          sx={{ backgroundColor: "#ccc", mt: 4, mb: 4 }}
                        />
                        <Typography
                          variant="h4"
                          component="h1"
                          gutterBottom
                          data-aos="fade-right"
                          data-aos-delay="400"
                        >
                          Top News Feeds
                        </Typography>
                        {/* NEWS FEEDS LIST TABLE */}
                        <NewsFeedsTable />
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="h4"
                          component="h1"
                          gutterBottom
                          data-aos="fade-right"
                          data-aos-delay="200"
                        >
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
                            <Typography
                              variant="h5"
                              component="h2"
                              gutterBottom
                              data-aos="fade-right"
                              data-aos-delay="600"
                            >
                              {section?.title}
                            </Typography>
                            <Typography
                              variant="body1"
                              paragraph
                              data-aos="fade-right"
                              data-aos-delay="800"
                              sx={{
                                color: "#ccc",
                                whiteSpace: "pre-line",
                                lineHeight: 1.8,
                                fontFamily: "Inter",
                              }}
                            >
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
                      </>
                    )}
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
      <ScrollToTop />
    </Box>
  );
};

export default Learn;
