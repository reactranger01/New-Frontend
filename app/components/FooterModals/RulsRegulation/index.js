import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { PropTypes } from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'white',
  // border: '2px solid #000',
  // boxShadow: 24,
  outline: 'none',
  p: 2,
  borderRadius: '10px',
};
const RulsRegulation = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col gap-5 relative p-2 py-5 overflow-y-auto h-screen">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-black text-xl cursor-pointer"
          >
            <AiOutlineClose />
          </button>

          {/* Modal Content */}
          <h2 id="modal-modal-title" className="text-lg font-bold">
            The Site Rules And Regulations
          </h2>
          <h1 className="text-lg font-bold">PART A - INTRODUCTION</h1>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            1. Use and interpretation
          </h2>
          <p id="modal-modal-description" className="text-sm text-gray-700">
            These Rules and Regulations (&quot;Rules&quot;) are part of the Site
            &apos s terms and conditions.
          </p>
          <p className="text-sm text-gray-700">
            The Rules apply to all bets placed on this online betting platform
            (&quot;Site&quot;). The Rules consist of the following:
          </p>
          <ul className="text-sm text-gray-700">
            <li>This INTRODUCTION section (Part A);</li>
            <li>The GENERAL RULES (set out in Part B below); and</li>
            <li>
              The SPECIFIC SPORTS RULES (set out in Part C below - these apply
              to certain sports).
            </li>
          </ul>
          <p className="text-sm text-gray-700">
            The General Rules apply to all bets unless stated otherwise in the
            Specific Sports Rules. If there is any inconsistency between the
            Specific Sports Rules and the General Rules, the Specific Sports
            Rules shall prevail.
          </p>
          <p className="text-sm text-gray-700">
            The rules governing how markets are offered, managed and/or settled
            are not the same for every market on each product. In certain
            circumstances, a bet that is settled as a winner on one product may
            be settled as a loser on the other product (and vice versa).
            Additionally, different settlement rules may apply so that, for
            example, bets that are a winner on one product may be settled as a
            dead heat or be voided on the other product. Customers must ensure
            that they familiarise themselves with the relevant rules that apply
            to the bets that they place on the Site.
          </p>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            2. Customer responsibility
          </h2>
          <ul className="text-sm text-gray-700">
            <li>
              Customers should make themselves aware of all of the Rules
              affecting any market on which they wish to place a bet.
            </li>
            <li>
              In particular, customers who use the &quot;one-click&quot; option
              to place bets are solely responsible for their actions and the
              Site shall have no liability to such customers for any errors made
              by customers when using this option.
            </li>
          </ul>
          <h1 className="text-lg font-bold">PART B - GENERAL RULES</h1>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            1. Matters beyond the Site&apos;s reasonable control and
            malfunctions
          </h2>
          <p id="modal-modal-description" className="text-sm text-gray-700">
            The Site is not liable for any loss or damage you may suffer because
            of any: act of God; power cut; trade or labour dispute; act, failure
            or omission of any government or authority; obstruction or failure
            of telecommunication services; or any other delay or failure caused
            by a third party or otherwise outside of our control. In such an
            event, the Site reserves the right to cancel or suspend access to
            the Site without incurring any liability.
          </p>
          <p id="modal-modal-description" className="text-sm text-gray-700">
            The Site is not liable for the failure of any equipment or software
            howsoever caused, wherever located or administered, or whether under
            its direct control or not, that may prevent the operation of the
            Site.
          </p>
          <p id="modal-modal-description" className="text-sm text-gray-700">
            In the event of a technological failure or error which is apparent
            to the customer, the customer is obliged to notify the Site of such
            failure/error immediately. If the customer continues to place a bet
            in these circumstances, they shall take reasonable action to
            minimise any potential loss. In the absence of such action, the Site
            reserves the right to void a bet.
          </p>
          <p id="modal-modal-description" className="text-sm text-gray-700">
            The Site reserves the right in its absolute discretion to restrict
            access to the Site, or withhold funds or void any bets outstanding
            to a customer&apos;s account in its absolute discretion in the event
            of a technological failure or other malfunction which affects the
            integrity of the Site whether this is under its direct control or
            otherwise. Customers will be notified on the Site of any such
            malfunction which may operate to prevent the placing of further bets
            or which may result in outstanding bets being voided.
          </p>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            2. Managing markets In-Play
          </h2>
          <h4 className="text-lg font-bold">General</h4>
          <ul className="text-sm text-gray-700">
            <li>
              For everything other than horseracing and greyhound racing, if a
              market is not scheduled to be turned in-play but the Site fails to
              suspend the market at the relevant time, then:
              <ol className="text-sm text-gray-700">
                <li>
                  if the event has a scheduled &apos;off&apos; time, all bets
                  matched after that scheduled off time will be void; and
                </li>
                <li>
                  if the event does not have a scheduled &apos;off&apos; time,
                  the Site will use its reasonable endeavours to ascertain the
                  time of the actual &apos;off&apos; and all bets after the time
                  of the &apos;off&apos; determined by the Site will be void.
                </li>
              </ol>
            </li>
            <li>
              For horseracing and greyhound racing, if a market is not scheduled
              to be turned in-play but the Site fails to suspend the market at
              the relevant time, then all bets matched after the official
              &apos;off&apos; time will be void.
            </li>
            <li>
              The Site aims to use its reasonable endeavours to suspend in-play
              markets at the start of and at the end of the event. However, the
              Site does not guarantee that such markets will be suspended at the
              relevant time.
            </li>
            <li>
              Customers are responsible for managing their in-play bets at all
              times.
            </li>
            <li>
              For the purposes of in-play betting, customers should be aware
              that transmissions described as &apos;live&apos; by some
              broadcasters may actually be delayed or pre-recorded. The extent
              of any delay may vary depending on the set-up through which they
              are receiving pictures or data.
            </li>
          </ul>
          <h4 className="text-lg font-bold">
            All markets other than soccer markets - not suspending at the time
            of the &apos;off&apos;
          </h4>
          <ul className="text-sm text-gray-700">
            <li>
              In relation to markets which are scheduled to be turned in-play,
              the Site aims to use its reasonable endeavours to turn such
              markets in-play at the time of the &apos;off&apos;. However, the
              Site does not guarantee that such markets will be suspended and
              turned in-play at the time of the &apos;off&apos;.
            </li>
            <li>
              If a market is scheduled to be turned in-play but the Site does
              not suspend the market and cancel unmatched bets at the time of
              the &apos;off&apos; and the market is not turned in-play with
              unmatched bets cancelled at any time during the event, all bets
              matched after the scheduled time of the &apos;off&apos; will be
              void (in the case of horseracing and greyhound racing, bets will
              be void from the official rather than the scheduled
              &apos;off&apos; time). If the event does not have a scheduled
              &apos;off&apos;time, the Site will use its reasonable endeavours
              to ascertain the time of the actual &apos;off&apos; and all bets
              after the time of the &apos;off&apos;determined by the Site will
              be void.
            </li>
            <li>
              If a market is scheduled to be turned in-play but the Site does
              not suspend the market at the time of the &apos;off&apos; (so
              unmatched bets are not cancelled at that time), but the market is
              intentionally turned in-play at a later time during the event, all
              bets matched after the time of the &apos;off&apos; will stand. .
            </li>
          </ul>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            3. Soccer markets - not suspending at kick-off or on the occurrence
            of a Material Event and rules relating to VAR
          </h2>
          <ul className="text-sm text-gray-700">
            <li>
              Not suspending at kick-off
              <ol className="text-sm text-gray-700">
                <li>
                  1. In relation to soccer markets that are scheduled to be
                  turned in-play, the Site aims to use its reasonable endeavours
                  to turn such markets in-play at kick-off and to suspend such
                  markets on the occurrence of a Material Event (see definition
                  of &quot;Material Event&quot; below).
                </li>
                <li>
                  2. The Site does not guarantee that such markets will be
                  suspended and turned in-play at kick-off.
                </li>
                <li>
                  3. If a market is scheduled to be turned in-play but the Site
                  does not suspend the market at kick-off and the market is not
                  turned in-play at any time during the match, all bets matched
                  after the scheduled time of the kick-off will be void.
                </li>
                <li>
                  4. If a market is scheduled to be turned in-play but the Site
                  does not suspend the market at kick-off (so unmatched bets are
                  not cancelled at that time), but the market is turned in-play
                  at a later time during the match, all bets matched after the
                  scheduled time of the kick-off and before the first
                  &quot;Material Event will stand. However, if there has been
                  one or more &quot;Material Events&quot;, any bets matched
                  between the first &quot;Material Event&quot; and the market
                  being turned in-play will be void.
                </li>
              </ol>
            </li>
            <li>
              Not suspending on the occurrence of a Material Event and
              cancellations of Material Events due to VAR
              <ol className="text-sm text-gray-700">
                <li>
                  1. If the Site does not suspend a market on time for the
                  occurrence of a Material Event, the Site reserves the right to
                  void bets unfairly matched after the Material Event has
                  occurred. Voiding of these bets may take place during the
                  event or retrospectively once a game is completed.
                </li>
                <li>
                  2. Where a Material Event is cancelled due to a determination
                  made via a video assistant referee, the Site will void all
                  bets which are matched between the occurrence of the Material
                  Event and the cancellation of it. The voiding of any such bets
                  may take place during the event or retrospectively once a game
                  is completed.
                </li>
              </ol>
            </li>
            <li>
              Definition of &quot;Material Event&quot;
              <ol className="text-sm text-gray-700">
                <li>
                  For the purpose of these Rules, a &quot;Material Event&quot;
                  shall mean a goal being scored, a penalty being awarded or a
                  player being sent off.
                </li>
              </ol>
            </li>
          </ul>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            4. Results and market settlement
          </h2>
          <h4 className="text-lg font-bold">General</h4>
          <ul className="text-sm text-gray-700">
            <li>
              Markets will be settled in accordance as set out in the Specific
              Sports Rules.
            </li>
            <li>
              Where the Specific Sports Rules do not specify how and on what
              basis a market will be settled, markets will be settled on the
              official result of the relevant governing body regardless of any
              subsequent disqualification or amendment to the result (except if
              an amendment is announced within 24 hours of the initial
              settlement of the relevant market in order to correct an error in
              reporting the result).
            </li>
            <li>
              If no official result of a relevant governing body is available,
              the result will be determined by the Site (acting reasonably)
              using information from independent sources. In such cases, if any
              new information comes into the public domain within 48 hours of
              settlement, then the Site shall (acting reasonably) determine
              either: (i) whether the market should be reinstated or resettled
              in light of this new information; or (ii) whether or not to wait
              for further information before deciding whether to reinstate or
              resettle the market. Except where the Site has announced that it
              is waiting for further information, any information that comes
              into the public domain more than 48 hours after a market has been
              settled shall not be considered by the Site (regardless of whether
              or not such information may have led to a different result).
            </li>
            <li>
              In the event of any uncertainty about any result or potential
              result, the Site reserves the right to suspend settlement of any
              market for an unlimited period until the uncertainty can be
              resolved to the reasonable satisfaction of the Site. The Site
              reserves the right to void any market if the uncertainty regarding
              settlement cannot be resolved to the Site&#39;s reasonable
              satisfaction.
            </li>
          </ul>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            5.Resettlements
          </h2>
          <ul className="text-sm text-gray-700">
            <li>
              Markets are generally settled shortly after the end of the event
              in question. the Site may settle (or part-settle) some markets
              before the official result is declared (or may increase a
              customer&#39;s &#39;available to bet&#39; balance by the minimum
              potential winnings of that customer on a given market) purely as a
              customer service benefit. However, the Site reserves the right to
              amend the settlement of the market if: (i) the official result is
              different to the result on which the Site initially settled the
              market; or (ii) if the whole market is eventually voided (e.g. for
              an abandoned event).
            </li>
            <li>
              The Site reserves the right to reverse the settlement of a market
              if a market is settled in error (for example, a human or technical
              error).
            </li>
            <li>
              If The Site resettles a market, this may lead to amendments being
              made to a customer&#39;s balance to reflect changes in market
              settlement.
            </li>
          </ul>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            6.Non-runners, withdrawals and disqualifications
          </h2>
          <ul className="text-sm text-gray-700">
            <li>
              Subject always to the Site&#39;s right to void bets under its
              terms and conditions or for any exception under the Rules, if a
              market contains a statement that says &#34;All bets stand, run or
              not&#34; (or something similar), then all bets on a team or
              competitor will stand regardless of whether or not the team or
              competitor starts the event or takes any part in the event.
            </li>
            <li>
              If a team or competitor is disqualified, withdraws or forfeits
              after starting an event they will be deemed a loser providing at
              least one other team or competitor completes the event. If no team
              or competitor completes an event (having started) then all bets
              will be void except for bets on any markets which have been
              unconditionally determined.
            </li>
          </ul>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            7. Winner with [named selection]&#39; markets
          </h2>
          <ul className="text-sm text-gray-700">
            <li>
              The Site may from time to time offer markets that are dependent on
              the participation of a particular competitor. If the competitor
              named in a &#39;Winner with …&#39; market title does not
              participate in the tournament or event then all bets on the market
              will be void.
            </li>
            <li>
              A team or competitor will be deemed to have participated if they
              have taken part to the extent necessary to record an official
              result or classification (including any disqualification but
              excluding any &#34;did not start&#34; or equivalent
              classification).
            </li>
          </ul>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            8. Abandonments, Cancellations, Postponements
          </h2>
          <p className="text-sm text-gray-700">
            Some markets have different rules and these are listed in the
            Specific Sports Rules. However, where a market has no rules in the
            Specific Sports Rules in relation to an abandonment, cancellation
            and/or postponement the following shall apply.
          </p>
          <p className="text-sm text-gray-700">
            In relation to any match, fixture, game, individual event, or
            similar: If the event is not completed within three days after the
            scheduled completion date, then all bets on markets for this event
            will be void, except for bets on any markets that have been
            unconditionally determined.
          </p>
          <p className="text-sm text-gray-700">
            In relation to any tournament, competition or similar: If the event
            is not completed within three days after the scheduled completion
            date, then any markets relating to the event will be settled in
            accordance with the official ruling of the relevant governing body,
            providing such a decision is given within 90 days after the
            scheduled completion date. If no official ruling is announced in
            this 90 day period, then bets on any market relating to this event
            will be void, except for bets on any markets which have been
            unconditionally determined. If a market is to be voided but has been
            part-settled as a courtesy to customers, then such part-settled bets
            will be reversed and all bets on the market will be void.
          </p>
          <p className="text-sm text-gray-700">
            The Site will decide (acting reasonably) whether a market relates to
            a match (or similar) or a tournament (or similar).
          </p>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            9. Change of venue
          </h2>
          <p className="text-sm text-gray-700">
            Some markets have different rules and these are listed in the
            Specific Sports Rules.
          </p>
          <p className="text-sm text-gray-700">
            However, if change of venue is not dealt with in the Specific Sports
            Rules then the following shall apply:
          </p>
          <ul className="text-sm text-gray-700">
            <li>
              For any team sport: if the scheduled venue is changed after the
              market is loaded by the Site, all bets will be void only if the
              new venue is a home ground of the original away team
            </li>
            <li>
              For all categories or markets other than team sports: if the
              scheduled venue is changed after the market is loaded by the Site,
              all bets will stand.
            </li>
            <li>
              If there is a change in the type of scheduled surface after the
              market has been loaded, all bets will stand.
            </li>
          </ul>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            10. Periods of time
          </h2>
          <p className="text-sm text-gray-700">
            Some markets have different rules and these are listed in the
            Specific Sports Rules. However, if not dealt with in the Specific
            Sports Rules then the following shall apply.
          </p>
          <p className="text-sm text-gray-700">
            If the scheduled duration of an event is changed after the market
            has been loaded but before the start of the event, then all bets
            will be void.
          </p>
          <p className="text-sm text-gray-700">
            Some markets refer to the length of time until an occurrence in the
            event (e.g. time of first goal). If an event happens in stoppage or
            injury time after any regular time period then it will be deemed to
            have occurred at the end of the regular time period. For example, if
            a goal is scored in first half stoppage-time in a soccer match it
            will be deemed to have occurred on 45 minutes.
          </p>
          <p className="text-sm text-gray-700">
            All bets apply to the relevant full &#39;regular time&#39; period
            including stoppage time. Any extra-time and/or penalty shoot-out is
            not included.
          </p>
          <p className="text-sm text-gray-700">
            References within these Rules to a particular number of
            &#39;days&#39; shall mean the end of the day local time after the
            expiry of the specified number of days.
          </p>
          <h2 className="text-lg font-bold">
            11. &#34;To Qualify&#34; Markets
          </h2>
          <p className="text-sm text-gray-700">
            Some markets have different rules and these are listed in the
            Specific Sports Rules. However, if not dealt with in the Specific
            Sports Rules, then the following shall apply.
          </p>
          <p className="text-sm text-gray-700">
            Any &#34;to qualify&#34; market (e.g., &#34;to reach the final&#34;
            markets) will be determined by the competitor or team that
            qualifies, whether or not they take part in the next round or event
            for which they have qualified.
          </p>
          <p className="text-sm text-gray-700">
            Markets will be settled after the qualifying stage, and any
            subsequent disqualification or amendment to the result will not
            count.
          </p>
          <h2 className="text-lg font-bold">12. Dead Heats</h2>
          <p className="text-sm text-gray-700">
            Unless stated otherwise in the Specific Sports Rules, the Dead Heat
            Rule applies to bets on a market where there are more winners than
            expected.
          </p>
          <p className="text-sm text-gray-700">
            For each bet matched on a relevant winning selection, the stake
            money is first reduced in proportion by multiplying it by the sum of
            the number of winners expected, divided by the number of actual
            winners (i.e., stake multiplied by (number of winners expected /
            number of actual winners)).
          </p>
          <p className="text-sm text-gray-700">
            The winnings are then paid to the successful backers on this
            &#34;reduced stake&#34; (reduced stake multiplied by traded price),
            and the remaining stake money is paid to the appropriate layers.
          </p>
          <h2 className="text-lg font-bold">13. Miscellaneous</h2>
          <ul className="text-sm text-gray-700 list-disc ml-5">
            <li>
              All references to time periods in the Rules relate to the time
              zone in which the event takes place. For example, a reference to
              the start time of a football match relates to the local kick-off
              time.
            </li>
            <li>
              All information supplied by the Site is done so in good faith.
              However, the Site cannot accept liability for any errors or
              omissions in respect of any information, such as the posting of
              prices, runners, times, scores, results, or general statistics.
            </li>
            <li>
              The Site reserves the right to correct any obvious errors and
              shall take all reasonable steps to ensure markets are administered
              with integrity and transparency.
            </li>
            <li>
              If an incorrect team or competitor name is displayed (excluding
              minor spelling mistakes) or the incorrect number of teams,
              competitors, or outcomes is displayed in any complete market, or a
              market is otherwise loaded using incorrect information or includes
              any obvious error, the Site reserves the right to suspend the
              market and (providing it acts reasonably) to void all bets matched
              on the market.
            </li>
            <li>
              Customers are responsible for ensuring that they satisfy
              themselves that the selection on which they place a bet is their
              intended selection. For example, in the case of a competitor
              bearing the same name as another individual not competing in the
              relevant event, the onus is on the customer to ensure that they
              know which competitor the Site has loaded into the relevant market
              and to ensure that they are placing their bet on their chosen
              competitor.
            </li>
            <li>
              The Site may, in its sole and absolute discretion, decide to
              suspend betting on a market at any time (even if such suspension
              is earlier than anticipated by the Rules). In the interests of
              maintaining integrity and fairness in the markets, the Site may
              also void certain bets in a market or void a whole market in its
              entirety.
            </li>
            <li>
              In the event that members are unable to place bets due to
              technical issues or for any other reason, the Site has no
              obligation to accept bets in an alternate manner. Any bets
              attempted to be placed in another manner will not be accepted.
            </li>
            <li>
              The Site reserves the right to void any bets placed on markets
              where an incorrect price or line was offered.
            </li>
            <li>
              The Site reserves the right to close or suspend a customer’s
              account if it considers that the customer has used the Site in an
              unfair manner, has deliberately cheated or taken unfair advantage,
              or if the customer’s account is being used for the benefit of a
              third party. The Site also reserves the right to close or suspend
              a customer’s account if it considers that it has been used in a
              fraudulent manner or for illegal and/or unlawful or improper
              purposes.
            </li>
            <li>
              The Site reserves the right to amend the Rules at any time. Any
              such revision will be binding and effective immediately on the
              posting of such rule changes on the Site, and any markets loaded
              after the new Rules have been posted shall be governed by the new
              Rules.
            </li>
            <li>
              The Site reserves the right to cancel unmatched bets to protect
              customers at any time.
            </li>
            <li>
              The Site shall use its reasonable endeavours to resolve disputes
              and shall act with fairness and integrity in exercising its rights
              under these rules. The Site’s decision in such cases shall be
              final and binding upon the customer.
            </li>
            <li>
              On the settlement of any market, amounts relating to:
              <ul className="list-disc ml-5">
                <li>1. winnings/losses on bets</li>
                <li>2. any charges</li>
              </ul>
              will be rounded up or down to the nearest two decimal places.
            </li>
          </ul>
          <h2 className="text-lg font-bold">14. Multiple Accounts</h2>
          <p className="text-sm text-gray-700">
            Customers are not permitted to hold multiple accounts. This includes
            holding an account with any other site operating on the same
            platform as this Site.
          </p>
          <p className="text-sm text-gray-700">
            Customers who continue to operate multiple accounts will have their
            accounts &#34;linked&#34; and managed accordingly, which may affect
            the extent to which bets can be placed on the Site.
          </p>
          <p className="text-sm text-gray-700">
            If the Site believes, in its absolute discretion, that customers
            have registered and/or used more than one account, and/or acted in
            collusion with one or more other individuals through a number of
            different accounts, the Site reserves the right to void bets and/or
            withhold any winnings arising from such behavior.
          </p>

          <h2 className="text-lg font-bold">
            15. Use of Virtual Private Network (VPN) and Proxy Servers
          </h2>
          <p className="text-sm text-gray-700">
            Customers using VPN applications to mask location or proxy servers
            to mask device are liable to having bets invalidated.
          </p>
          <p className="text-sm text-gray-700">
            Customers appearing from multiple IP locations are also liable to
            having bets invalidated.
          </p>

          <h2 className="text-lg font-bold">16. Cheating/Sniping</h2>
          <p className="text-sm text-gray-700">
            Cheating of any kind is not allowed and customers who are deemed to
            be cheating are liable to have bets made void.
          </p>
          <p className="text-sm text-gray-700">
            Cheating includes but is not limited to: market price manipulation,
            court siding, sniping, commission abuse, and maximum bet/maximum win
            limit abuse.
          </p>

          <h2 className="text-lg font-bold">17. Integrity</h2>
          <p className="text-sm text-gray-700">
            The Site reserves the right to void any bets that are under review
            as part of any integrity investigation.
          </p>
          <p className="text-sm text-gray-700">
            The Site may void certain bets in a market or void a whole market in
            its entirety as a result of any integrity investigation.
          </p>
          <p className="text-sm text-gray-700">
            The Site’s decision in such integrity cases shall be final and
            binding upon the customer.
          </p>
          <h1 className="text-lg font-bold">PART C - SPECIFIC SPORTS RULES</h1>
          <h2 className="text-lg font-bold">1. Cricket</h2>
          <h4 className="text-lg font-bold">General</h4>
          <ul className="text-sm text-gray-700">
            <li>
              If a ball is not bowled during a competition, series, or match
              then all bets will be void except for those on any market that has
              been unconditionally determined (e.g., in the &#39;Completed
              Match&#39; market).
            </li>
            <li>
              If a match is shortened by weather, all bets will be settled
              according to the official result (including for limited overs
              matches, the result determined by the Duckworth Lewis method).
            </li>
            <li>
              In the event of a match being decided by a bowl-off or toss of the
              coin, all bets will be void except for those on markets that have
              been unconditionally determined.
            </li>
          </ul>

          <h4 className="text-lg font-bold">Test Matches</h4>
          <ul className="text-sm text-gray-700">
            <li>
              If a match starts but is later abandoned for any reason other than
              weather (e.g., dangerous or unplayable wicket or outfield, pitch
              vandalism, strike or boycott, crowd protests/violence, stadium
              damage, acts of terrorism, or acts of God), the Site reserves the
              right to void all bets, except for those on markets that have been
              unconditionally determined.
            </li>
            <li>
              If the match is not scheduled to be completed within five days
              after the original scheduled completion date, then all bets on
              markets for this event will be void, except for bets on any
              markets that have been unconditionally determined.
            </li>
          </ul>

          <h4 className="text-lg font-bold">Limited Over Matches</h4>
          <ul className="text-sm text-gray-700">
            <li>
              If a match is declared &#34;No Result&#34;, bets will be void on
              all markets for the event except for those markets which have been
              unconditionally determined or where the minimum number of overs
              have been bowled as laid out in the market-specific information.
            </li>
            <li>
              In the event of a new toss taking place on a scheduled reserve day
              for a limited overs match, all bets placed after 30 minutes before
              the original scheduled start of play on the first day will be made
              void. This rule relates to all markets except those that have been
              unconditionally determined (e.g., in the win the toss and toss
              combination markets).
            </li>
            <li>
              The Super Over market refers to the entire Super Over as a
              tiebreak mechanism. Where only one Super Over is played, the Site
              will void all Super Over bets in the event of a tied Super Over
              regardless of settlement rules elsewhere. If more than one Super
              Over is played, the Site will settle all Super Over bets based on
              the winning team of the final Super Over unless the final Super
              Over is tied, in which case the Site will void all Super Over
              bets.
            </li>
          </ul>

          <h4 className="text-lg font-bold">Completed Match</h4>
          <ul className="text-sm text-gray-700">
            <li>
              A match will be treated as &#34;Completed&#34; when the required
              number of overs for that game have been completed as determined by
              the match officials. If the required number of overs for that
              match has not been completed, the match will be treated as
              &#34;Match Abandoned&#34; or &#34;No Result&#34; and bets will be
              settled accordingly.
            </li>
            <li>
              Please be aware that bets will carry over onto any reserve day and
              will be settled on the official result of the match. If a match is
              postponed or abandoned for any reason other than weather (which
              may include but is not limited to: dangerous or unplayable wicket
              or outfield; pitch vandalism; strike or boycott; crowd
              protests/violence; stadium damage; acts of terrorism; and acts of
              God), The Site reserves the right to void all bets on this market.
            </li>
          </ul>

          <h4 className="text-lg font-bold">
            Sessions/Innings/Player Runs - Fancy
          </h4>
          <ul className="text-sm text-gray-700">
            <li>
              All session/innings/player runs are based on Haar-Jeet odds
              format.
            </li>
            <li>
              In the event of rain reduced innings:
              <ol className="text-sm text-gray-700">
                <li>
                  1. If an innings is curtailed before the original scheduled
                  start of play, all bets will be settled.
                </li>
                <li>
                  2. If an innings is curtailed after the start of play, then
                  all bets on markets for this event will be settled up to the
                  stipulated new innings length.
                </li>
              </ol>
            </li>

            <li>
              In any session market, if a session is not completed in full
              because a team is all out or declared, all bets will remain valid
              and the market will be settled at the innings score.
            </li>
            <li>
              For Advance Session markets denoted by &#39;ADV&#39; in market
              name, only the 1st team to bat Innings markets are valid. For Test
              Matches, the 1st innings for each team is valid.
            </li>
            <li>
              We endeavour to suspended all ADV markets during the toss but this
              is not guaranteed for all events and dependent on media coverage.
              The site reserves the right to void bets deemed to take advantage
              of information not generally available.
            </li>
            <li>
              If any fixture is subject to conditions that may alter the length,
              structure or format of the fixture in any manner (e.g. rain), ADV
              markets may be suspended.
            </li>
            <li>
              Batsman Runs - bets will stand if the batsman has faced one ball
              or is given out before first ball is faced. Score counts if
              batsman is Not-Out including if innings is declared. In case of
              rain, match abandoned etc. settled bets will be valid.
            </li>
            <li>
              Runs at Fall of 1st Wicket – This market will be settled based on
              the total number of runs scored at the fall of the first wicket.
              At least one ball must be bowled, if no wickets fall bets will be
              void unless settlement is already determined.
            </li>
            <li>
              Runs at Fall of Next Wicket - The score before the fall of the
              specified wicket determines the result of the market. If a team
              declares or reaches their target then the score at the conclusion
              of the innings will determine the settlement of the bets. Bets
              will be settle should no more play take place following the
              intervention of rain, or any other delay. In case of rain, match
              abandoned etc. settled bets will be valid.
            </li>
            <li>
              Over Total Runs – Bets will be settled on the total number of runs
              scored during the 1st over of the match. The over must be
              completed for bets to stand unless settlement is already
              determined.
            </li>
            <li>
              In the instance that a market is not suspended upon the completion
              of the market, all bets placed after the time of completion may be
              made void.
            </li>
            <li>
              ADV Opening Batsmen markets are only valid if the batsmen selected
              in the market opens the batting. If the opening batsmen change,
              then the opening batsmen market in relation to the particular
              player who was changed will be made void.
            </li>
            <li>Penalty runs will not be included.</li>
          </ul>

          <h4 className="text-lg font-bold">
            Format-Specific Session Runs Rules
          </h4>
          <h6 className="text-lg font-bold">Test Matches</h6>
          <ul className="text-sm text-gray-700">
            <li>
              Test Matches (Meter Paari), all bets, open or closed, on a team’s
              innings runs shall be void if 70 full overs are not bowled, unless
              one team has won, is dismissed, or declares prior to that point.
            </li>
            <li>
              ADV markets for both teams will be valid in test matches,
              regardless of which team bats first.
            </li>
            <li>
              Where a session is open for a nominated number of overs but the
              team declare before the end of that session, the session is made
              complete by the remaining number of balls from the opposing team’s
              innings that follows the declaration.
            </li>
            <li>
              Day 1, session 1, a minimum of 25 overs must be bowled, otherwise
              all bets in this session market will be void.
            </li>
            <li>
              Day 1, session 2, a minimum of 25 overs must be bowled, otherwise
              all bets in this session market will be void.
            </li>
            <li>
              1st Day Total Run markets will only be valid if a minimum of 80
              overs are bowled on this day. Otherwise all bets in this market
              will be void.
            </li>
            <li>
              Test Matches - (PLAYERS METER) Individual Batsmen Runs /
              Partnerships - All bets, open or closed, on an individual batsman
              or partnership runs shall be void if 50 full overs are not bowled
              unless one team has won, is dismissed or declares prior to that
              point. Bets on partnership totals make up when the next wicket
              falls. If a batsman in the relevant partnership retires hurt, the
              partnership is treated as continuing between the remaining batsman
              and the batsman who comes to the wicket. A partnership is also
              treated as being ended by the end of an innings.
            </li>
            <li>
              Total Match Four, Total Match Sixes, Total Match Runs, Total Match
              Wides, Total Match Extras, Total Match Wicket, Top Batsmen,
              Highest Over, Innings Designated Line Markets will only be valid
              if the third innings is played. Otherwise, all bets will be void.
            </li>
            <li>
              Next Batsman Out markets - if a player retires injured, bets will
              be void in this market.
            </li>
          </ul>
          <h6 className="text-lg font-bold">Limited Overs Matches</h6>
          <ul className="text-sm text-gray-700">
            <li>
              Limited Overs Matches - (Player Meter), Individual Batsmen Runs or
              Partnerships - In a limited overs match where bets may be made on
              an individual batsman or partnership runs in-play and the innings
              is curtailed or subject to any reduction in overs, then these
              markets will be settled at the midpoint of the last available
              quote before the overs were reduced. If the innings resumes at a
              later time, a new market may be formed. If a customer wants a
              position in the new market they are required to place a new bet.
              If there are any subsequent reductions in overs, exactly the same
              rules will continue to apply i.e. the market is settled at the
              midpoint of the last available quote before the overs were reduced
              and a new market may be formed.
            </li>
            <li>
              Total Match Four,Total Match Sixes, Total Match Runs, Total Match
              Wides, Total Match Extras, Total Match Wicket, Top Batsmen,
              Highest Over, Innings Designated Line Markets will only be valid
              if the second innings is played. Otherwise, all bets will be void.
            </li>
            <li>
              In the event of an inning length being altered due to rain, match
              abandonment or any other condition, markets already settled will
              remain settled and all bets will remain valid. Bets in markets
              that are yet to be determined will be settled as per score.
            </li>
          </ul>
          <h2 className="text-lg font-bold"> Exchange Runs</h2>
          <ul className="text-sm text-gray-700">
            <li>
              Bets are placed in an exchange and matched with corresponding
              bets.
            </li>
            <li>Bets will be matched at the requested run line or better.</li>
            <li>All exchange runs are based on decimal odds format.</li>
            <li>All bets are placed at 2.00 odds.</li>
            <li>
              Bets will be void in the following cases, regardless of whether
              the outcome of the bet is already unconditionally determined:
              <ol className="text-sm text-gray-700">
                <li>
                  1. if the scheduled number of overs for the innings is reduced
                  by rain interruption and at settlement time, the actual number
                  of overs bowled is less than the number of overs stipulated
                  for the market; or
                </li>
                <li>
                  2. if the scheduled number of overs for the innings is reduced
                  for any other reason after the innings has begun, and at
                  settlement time, the reduced number of scheduled overs is less
                  than the number of overs stipulated for the market.
                </li>
              </ol>
            </li>
            <li>
              Please note that if the batting side reach their target within the
              total amount of stipulated overs or have been bowled out and the
              innings hasn’t been reduced in overs to less than the stipulated
              number of overs for the market, the market will be settled as
              complete.
            </li>
          </ul>

          <h2 className="text-lg font-bold"> Genie Bet Markets</h2>
          <h4 className="text-lg font-bold">
            1. General Twenty20 Cricket Betting Rules
          </h4>

          <ol className="text-sm text-gray-700">
            <li>
              1. Genie Bets placed on Twenty20 Cricket are not inclusive of any
              ‘Super Over’. Bets are settled on the maximum allotted overs per
              team (20).
            </li>
            <li>
              2. Any reference to ‘bet’ refers to the entire contents of a Genie
              Bet betslip. Any reference to a ‘selection’ is in reference to one
              selection within the related bet. Genie Bet is the aggregate bet
              compromised of all constituent selections.
            </li>
            <li>
              3. If a player in the bet does not take any part in the match,
              then the whole bet will be made void, regardless of the rest of
              the selections within the bet. If the player takes to the pitch,
              then all player related bets will be settled accordingly as
              win/loss. ‘Player A to get 1+ Six’ would be a losing selection if
              he participates in fielding but does not bat. ‘Player B to get 1+
              Wicket’ would be a losing selection if he takes any part in the
              match regardless of whether he bowls. This ruling refers to any
              player related markets. Please refer to section 2 (Bet Type
              Settlement Rules) for player related market breakdowns and
              rulings.
            </li>
            <li>
              4. Any void selection within your bet, will deem the entire bet
              void.
            </li>
            <li>
              5. If all the selections within the bet are valid (all players
              involved within the bet take part within the match), any losing
              selection within the bet will deem the entire bet a losing bet. A
              winning slip must be comprised of winning selections only.
            </li>
            <li>
              6. For any obvious pricing errors, we reserve the right to
              cancel/void any bets placed at that wrong price. We also reserve
              the right to cancel/void any bets on events where the venue is
              changed after the publication of odds.
            </li>
            <li>
              7. In the event of a batsman retiring for any reason, all relevant
              batting markets for this batsman will be settled on the runs at
              the time of their retirement.
            </li>
            <li>
              8. Any markets ending in ‘dead heats’ will be deemed as losers.
              For example, if you are to bet Player A ‘Top bat for his team’ and
              both him and Player B are top run scorers on the joint number of
              runs for their team– this would constitute a loser.
            </li>
            <li>
              9. All ‘Team Runs’ markets will stand independent of the toss
              result. For example, ‘Over 150 Team A Runs’ is resulted even when
              Team B bat first and achieve 140 runs.
            </li>
            <li>
              10. All markets will be settled on the result of the match on the
              day that it is played and completed. Any results that are changed
              retrospectively will not alter the settlement of the market.
            </li>
            <li>
              11. If a match is postponed before the scheduled start and is
              subsequently rescheduled to be played less than 24 hours
              (inclusive) from the originally allotted start time, all bets will
              stay active and will be settled upon the result of the rescheduled
              match. If a match is postponed before the original start date/time
              and is subsequently rescheduled to be played more than 24 hours
              from the original start time, all bets will be voided.
            </li>
            <li>
              12. Any match where the start date/time has been altered well in
              advance (e.g. to ease fixture congestion) will not be classed as
              postponed.
            </li>
            <li>
              13. For matches played at a neutral venue, all bets will still
              count regardless of the order the teams are listed and whether we
              have indicated it is as being played at a neutral venue (except in
              the situation of an obvious pricing error, please refer to 1.5).
            </li>
            <li>
              14. In the event of a batsman retiring for any reason, all
              relevant batting markets for this batsman will be settled on the
              runs at the time of their retirement.
            </li>
          </ol>
          <h4 className="text-lg font-bold">2. Bet Type Rules</h4>
          <ol className="text-sm text-gray-700">
            <li>
              1. Who will win? – You are betting on the result, e.g. Team A,
              Draw or Team B…
            </li>
            <li>
              2. Who will score 10+/20+ runs? – You are betting that a nominated
              player will score 10+/20+ runs.
            </li>
            <li>
              3. Who will be top bat? – You are betting on who will be the top
              batsman in the match. As stated in 1.6, any dead heats will be
              classed as a losing selection.
            </li>
            <li>
              4. Who will be top bat for their team? – You are betting on who
              will be the top batsman for their respective team. As stated in
              1.6, any dead heats will be classed as a losing selection.
            </li>
            <li>
              5. Who will take a wicket? – You are betting on a player to take a
              wicket. A run out will not be classified as a wicket for the
              player who ran the batsman out. A ‘Mankad’ runout whereby the
              bowler runs out the non-striking batsman will not count as a
              wicket for the bowler.
            </li>
            <li>
              6. Who will hit a six? – You are betting on a nominated player to
              hit a six when batting. This must be signalled as six runs to the
              relevant player by the umpire and subsequently logged on any
              official scorecard as such. Running the six runs will not count as
              a six regarding this market.
            </li>
            <li>
              7. Who will hit a four? – You are betting on a nominated player to
              hit a four when batting. This must be signalled as four runs to
              the relevant player by the umpire and subsequently logged on any
              official scorecard as such. Running the four runs will not count
              as a four regarding this market.
            </li>
            <li>
              8. How many runs will a player score? – You are betting on a
              nominated player to score an amount of runs in their innings. If
              the player does not achieve the number of runs nominated,
              regardless of whether the player batted in the match then this
              selection would be a loser.
            </li>
            <li>
              9. How many sixes will a player hit? – You are betting on a
              nominated player to hit a nominated number of sixes when batting.
              Each six must be signalled as six runs to the relevant player by
              the umpire and subsequently logged on any official scorecard as
              such. Running the six runs will not count as a six regarding this
              market.
            </li>
            <li>
              10. How many fours will a player hit? – You are betting on a
              nominated player to hit a nominated number of fours when batting.
              Each four must be signalled as four runs to the relevant player by
              the umpire and subsequently logged on any official scorecard as
              such. Running the six runs will not count as a six regarding this
              market.
            </li>
            <li>
              11. How many wickets will a player take? – You are betting on
              whether a player will take the nominated number of wickets
              specified.
            </li>
            <li>
              12. Which team will get the highest opening partnership? – You are
              betting on which team will get the highest opening partnership
              score. This is the team who have the most runs at the point of the
              first wicket being taken.
            </li>
            <li>
              13. Which team will hit the most fours? – You are betting on which
              team will hit the most fours in the match.
            </li>
            <li>
              14. Which team will hit the most sixes? – You are betting on which
              team will hit the most sixes in the match.
            </li>
            <li>
              15. How many team stats? – You are betting on a nominated number
              of the following events for your team:
              <ol className="text-sm text-gray-700">
                <li>1. Sixes</li>
                <li>2. Catches</li>
                <li>3. Wickets</li>
              </ol>
            </li>
            <li>
              16. Which team will get the most? – You are betting on which team
              will get most of the following market-sets:
              <ol>
                <li>1. Catches</li>
                <li>2. Wickets</li>
                <li>3. Run outs</li>
              </ol>
            </li>
            <li>
              17. How many runs? – You are betting on the total amount of runs
              in the match achieved by both teams combined.
            </li>
            <li>
              18. How many match stats? – You are betting on a nominated number
              of the following events in the match:
              <ol className="text-sm text-gray-700">
                <li>1. Sixes</li>
                <li>2. Catches</li>
                <li>3. Wickets</li>
              </ol>
            </li>
            <li>
              19. What will the winning margin be? – You are betting on what the
              winning margin will be for each team. In the event of a reduced
              overs match, this market will be settled based on the official
              result based on Rain Rulings.
            </li>
            <li>
              20. How will the first wicket fall? – You are betting on the
              method by which the first wicket of the match will fall.
            </li>
            <li>
              21. What else will happen? – You are betting on the following
              markets:
              <ol className="text-sm text-gray-700">
                <li>
                  1. Super over - A super over, also known as a one-over
                  eliminator, to be played in the match.
                </li>
                <li>
                  2. 50 scored in the match – A player to achieve a score of 50
                  or more in the match.
                </li>
                <li>
                  3. Century scored in the match – A player to achieve a score
                  of 100 or more in the match.
                </li>
                <li>
                  4. Hat-trick taken in the match – A bowler to take a
                  ‘hat-trick’ in the match. A hat-trick is when a bowler
                  successfully dismisses three batsmen with consecutive
                  deliveries. The deliveries may be interrupted by an over
                  bowled by another bowler from the other end of the pitch but
                  must be three consecutive deliveries by the individual bowler.
                </li>
                <li>
                  5. Wicket taken in the 1st over – A wicket to be taken by the
                  bowling team in the 1st over of the match.
                </li>
              </ol>
            </li>
          </ol>
          <h2 className="text-lg font-bold"> Genie Combo Special</h2>
          <h4 className="text-sm font-bold">General rules</h4>
          <ul className="text-sm text-gray-700">
            <li>
              If a ball is not bowled during a match, then all bets will be
              void.
            </li>
            <li>
              If a match is shortened by weather, all bets will be settled
              according to the official result (including for limited overs
              matches, the result determined by the Duckworth Lewis method).
            </li>
            <li>
              In the event of a match being decided by a bowl-off or toss of the
              coin, all bets will be void except for those on markets that have
              been unconditionally determined.
            </li>
            <li>
              If a player included in any selection in the bet is not named in
              the official starting XI then the whole bet will be made void,
              regardless of the rest of the selections within the bet. If the
              player takes to the pitch, then all player related bets will be
              settled accordingly as win/loss. ‘Player A to get 1+ Six’ would be
              a losing selection if he participates in fielding but does not
              bat. ‘Player B to get 1+ Wicket’ would be a losing selection if he
              takes any part in the match regardless of whether he bowls. This
              ruling refers to any player related markets.
            </li>
            <li>
              In the case of official substitutes/impact players etc, bets
              containing players that are official substitutes and not in the
              official starting XI’s will be void.
            </li>
            <li>
              Any void selection within your bet, will deem the entire bet void.
            </li>
            <li>
              If all the selections within the bet are valid (all players
              involved within the bet take part within the match), any losing
              selection within the bet will deem the entire bet a losing bet. A
              winning slip must be comprised of winning selections only.
            </li>
            <li>
              Any markets ending in ‘dead heats’ will be deemed as losers. For
              example, if you are to bet Player A ‘Top bat for his team’ and
              both him and Player B are top run scorers on the joint number of
              runs for their team– this would constitute a loser.
            </li>
            <li>
              In the event of a batsman retiring for any reason, all relevant
              batting markets for this batsman will be settled on the runs at
              the time of their retirement.
            </li>
            <li>
              If a match is postponed before the scheduled start and is
              subsequently rescheduled to be played less than 24 hours
              (inclusive) from the originally allotted start time, all bets will
              stay active and will be settled upon the result of the rescheduled
              match. If a match is postponed before the original start date/time
              and is subsequently rescheduled to be played more than 24 hours
              from the original start time, all bets will be voided.
            </li>
            <li>
              All ‘Team Runs’ markets will stand independent of the toss result.
              For example, ‘Over 150 Team A Runs’ is resulted even when Team B
              bat first and achieve 140 runs.
            </li>
            <li>Penalty runs will not be included in any settlement totals.</li>
            <li>
              In the case of rain affected matches, where match overs are
              reduced in any capacity:
              <ul className="text-sm text-gray-700">
                <li>
                  The following minimum number of overs must be scheduled, and
                  there must be an official result (Duckworth-Lewis counts)
                  otherwise all bets are void, unless result can already be
                  determined:
                </li>
                <ul className="text-sm text-gray-700">
                  <li>Twenty20 Matches - The full 20 overs for each team.</li>
                  <li>One Day Matches - At least 40 overs for each team.</li>
                  <li>100-Ball Matches – At least 80 balls for each team.</li>
                  <li>T10 Matches – The full 10 overs for each team.</li>
                  <li>
                    Test Matches – All bets stand regardless of number of overs
                    played as long as there is an official result.
                  </li>
                </ul>
              </ul>
            </li>
            <li>What are you betting on?</li>
            <ul className="text-sm text-gray-700">
              <li>
                Who will win? – You are betting on the result, e.g. Team A, Draw
                or Team B…
              </li>
              <li>
                Who will score 10+/20+/50+/100+ runs? – You are betting that a
                nominated player will score 10+/20+/50+/100+ runs.
              </li>
              <li>
                Who will be top bat? – You are betting on who will be the top
                batsman in the match. Any dead heats will be classed as a losing
                selection.
              </li>
              <li>
                Who will be top bowler? – You are betting on who will be the top
                bowler in the match. Any dead heats will be classed as a losing
                selection.
              </li>
              <li>
                Who will be top bat for their team? – You are betting on who
                will be the top batsman for their respective team. Any dead
                heats will be classed as a losing selection.
              </li>
              <li>
                Who will be top bowler for their team? – You are betting on who
                will be the top bowler for their respective team. Top bowler is
                defined as the highest number of wickets taken. Any dead heats
                will be classed as a losing selection.
              </li>
              <li>
                Will top match batsman score be greater than X? – You are
                betting on ether the score of the highest scoring individual
                batsman in the game will be greater than X.
              </li>
              <li>
                Will named player outscore another named player? – You are
                betting on a nominated player to score.
              </li>
              <li>
                Who will take a wicket? – You are betting on a player to take a
                wicket. A run out will not be classified as a wicket for the
                player who ran the batsman out. A ‘Mankad’ runout whereby the
                bowler runs out the non-striking batsman will not count as a
                wicket for the bowler.
              </li>
              <li>
                Who will hit a six? – You are betting on a nominated player to
                hit a six when batting. This must be signalled as six runs to
                the relevant player by the umpire and subsequently logged on any
                official scorecard as such. Running the six runs will not count
                as a six regarding this market.
              </li>
              <li>
                Who will take a catch? – You are betting on a nominated player
                to take a catch, as logged on any official scorecard.
              </li>
              <li>
                Who will hit a four? – You are betting on a nominated player to
                hit a four when batting. This must be signalled as four runs to
                the relevant player by the umpire and subsequently logged on any
                official scorecard as such. Running the four runs will not count
                as a four regarding this market.
              </li>
              <li>
                How many runs will a player score? – You are betting on a
                nominated player to score an amount of runs in their innings. If
                the player does not achieve the number of runs nominated,
                regardless of whether the player batted in the match then this
                selection would be a loser.
              </li>
              <li>
                How many sixes will a player hit? – You are betting on a
                nominated player to hit a nominated number of sixes when
                batting. Each six must be signalled as six runs to the relevant
                player by the umpire and subsequently logged on any official
                scorecard as such. Running the six runs will not count as a six
                regarding this market.
              </li>
              <li>
                How many fours will a player hit? – You are betting on a
                nominated player to hit a nominated number of fours when
                batting. Each four must be signalled as four runs to the
                relevant player by the umpire and subsequently logged on any
                official scorecard as such. Running the six runs will not count
                as a four regarding this market.
              </li>
              <li>
                How many wickets will a player take? – You are betting on
                whether a player will take the nominated number of wickets
                specified.
              </li>
              <li>
                Will a player score more than X Dream11 Fantasy points? – Will a
                named player earn X or more Dream11 fantasy points throughout
                the course of a match. Total Dream11 fantasy points will be
                settled on official Dream11 result.
              </li>
              <li>
                Will named player be player of the match? - Bets will be settled
                on the officially declared Player of the Match.
              </li>
              <li>
                Which team will get the highest opening partnership? – You are
                betting on which team will get the highest opening partnership
                score. This is the team who have the most runs at the point of
                the first wicket being taken.
              </li>
              <li>
                Which team will hit the most fours? – You are betting on which
                team will hit the most fours in the match.
              </li>
              <li>
                Which team will hit the most sixes? – You are betting on which
                team will hit the most sixes in the match.
              </li>
              <li>
                How many team stats? – You are betting on a nominated number of
                the following events for your team:
                <ul className="text-sm text-gray-700">
                  <li>Sixes</li>
                  <li>Catches</li>
                  <li>Wickets</li>
                </ul>
              </li>
              <li>
                Which team will get the most? – You are betting on which team
                will get most of the following market-sets:
                <ul className="text-sm text-gray-700">
                  <li>Catches</li>
                  <li>Wickets</li>
                  <li>Run outs</li>
                  <li>
                    Ducks (batsman scoring 0 runs after facing at least 1 ball)
                  </li>
                </ul>
              </li>
              <li>
                How many runs? – You are betting on the total amount of runs in
                the match achieved by both teams combined.
              </li>
              <li>
                How many match stats? – You are betting on a nominated number of
                the following events in the match:
                <ul className="text-sm text-gray-700">
                  <li>Sixes</li>
                  <li>Catches</li>
                  <li>Wickets</li>
                  <li>
                    Ducks (batsman scoring 0 runs after facing at least 1 ball)
                  </li>
                </ul>
              </li>
              <li>
                How will the first wicket fall? – You are betting on the method
                by which the first wicket of the match will fall.
              </li>
              <li>
                50 scored in the match? – A player to achieve a score of 50 or
                more in the match.
              </li>
              <li>
                Century scored in the match? – A player to achieve a score of
                100 or more in the match.
              </li>
              <li>
                Hat-trick taken in the match? – A bowler to take a ‘hat-trick’
                in the match. A hat-trick is when a bowler successfully
                dismisses three batsmen with consecutive deliveries. The
                deliveries may be interrupted by an over bowled by another
                bowler from the other end of the pitch but must be three
                consecutive deliveries by the individual bowler.
              </li>
              <li>
                Wicket taken in the 1st over? – A wicket to be taken by the
                bowling team in the 1st over of the match.
              </li>
              <li>
                Boundary scored in the 1st match over? – Any boundary scored by
                the batting team in the first over of the match.
              </li>
            </ul>
          </ul>
          <h2 id="modal-modal-title" className="text-lg font-bold">
            Soccer
          </h2>
          <ol className="text-sm text-gray-700">
            <li>
              1. If the Site does not suspend a market on time for the
              occurrence of a Material Event, the Site reserves the right to
              void bets unfairly matched after the Material Event has occurred.
              Voiding of these bets may take place during the event or
              retrospectively once a game is completed.
            </li>
            <li>
              2. If a match has not started (or if the Site believes that a
              match will not have started) by 23:59 (local time) on its
              scheduled start date, then all bets will be void unless the Site
              has knowledge that the match has been rescheduled to be played
              within three days of its original start date.
            </li>
            <li>
              3. If a match starts but is later abandoned or postponed and the
              Site believes that the match will not have been completed by 23:59
              (local time) on its scheduled start date, then all markets, with
              the exception of any unconditionally determined markets, will be
              void unless the Site has knowledge that the match has been
              rescheduled to be played within three days of its original start
              date. If the Site does have knowledge that the game will be played
              within three days and the game is played within three days, then
              all bets will stand except if the match is restarted from the
              beginning. If the match is restarted from the beginning then all
              bets matched before the market went in-play will stand, but any
              bets placed in-play will be void, except for any bets placed
              in-play on markets which have been unconditionally determined,
              which will stand.
            </li>
            <li>
              4. For Friendly matches, all bets apply to the full duration of
              play according to the match officials, plus any stoppage time. If
              a friendly match starts but is later abandoned or postponed and is
              not completed (i.e. the full duration of play according to match
              officials, plus any stoppage time) within three days of the
              scheduled start date, all bets will be void except for those on
              markets which have been unconditionally determined. In the case of
              ambiguity over the official result from match officials, the
              outcome will be determined by the Site (acting reasonably) using
              information from independent sources.
            </li>
            <li>
              5. Match odds bets apply to the full duration of play according to
              the match officials, plus any stoppage time. They do not include
              any result given after Extra Time or Penalties.
            </li>
            <li>
              6. If an official fixture lists different team details to those
              listed on the Site (for example, the team name, reserves, age
              group, gender, etc), then all bets matched on the affected markets
              will be void. In all other cases, bets will stand (including
              instances where a team name is listed without specifying the term
              &#39;XI&#39; in the name). If an official fixture is shown on the
              Site under an incorrect competition name, then the Site reserves
              the right to void all bets matched on the affected markets.
            </li>
            <li>
              7. If a team is disqualified, thrown out or otherwise removed from
              a league, one of the following will apply:
              <ol className="text-sm text-gray-700">
                <li>
                  If this happens before the relevant season has started, all
                  bets on all affected markets will be void (except for those on
                  markets which have been unconditionally determined);
                </li>
                <li>
                  If this happens after relevant season has started, all
                  affected markets will stand and the team will be deemed to be
                  relegated and all bets on that team will be settled
                  accordingly in all relevant markets (assuming, of course, that
                  it is not subsequently reinstated before the end of the
                  season).
                </li>
              </ol>
            </li>
            <li>
              8. The relevant season will be deemed to have started once the
              first league game has been played. For the purposes of this rule,
              markets relating to individual matches will not be deemed to be
              &#34;affected markets&#34;.
            </li>
            <li>
              9. For &#39;top goalscorer&#39; markets only the goals scored in
              the league or competition stated in the Market Information count.
              For example, if a player joins a club mid-season any goals scored
              in a different league will not count, however goals scored for a
              different club in the same league will count. Own goals will not
              count.
            </li>
            <li>
              10. In markets which relate to the number of incidents to occur,
              such as &#39;number of corners&#39;, these will be determined on
              the basis of the number taken, rather than awarded.
            </li>
            <li>
              11. For markets that relate to the number of bookings given, the
              number of corners taken, any goalscorer or the time of a
              particular goal, the result will be determined by the Site (acting
              reasonably) using information from independent sources. In such
              cases, if any new information comes into the public domain within
              48 hours of settlement, then the Site shall (acting reasonably)
              determine either: (i) whether the market should be reinstated or
              resettled in light of this new information; or (ii) to wait for
              further information before deciding whether to reinstate or
              resettle the market. Except where the Site has announced that it
              is waiting for further information, any information that comes
              into the public domain more than 48 hours after a market has been
              settled shall not be considered by the Site (regardless of whether
              or not such information may have led to a different result).
            </li>
            <li>
              12. Full-time (FT) bets are settled based on the FT result at the
              end of the scheduled period of play (90 minutes unless otherwise
              specified), or where matches are ended legitimately and given an
              official result by the referee. This includes any additional
              minutes of injury or stoppage time. Any extra-time period of play,
              Golden Goal or penalty shoot-out will not count for FT bet
              settlement purposes.
            </li>
            <li>
              13. Half-time (HT) bets are settled based on the score at
              half-time. HT results stand regardless of whether the match
              reaches FT.
            </li>
            <li>
              14. The Operator retains the right to void all bets where the
              scheduled playing time is less than 90 minutes or inconsistent to
              the pre-specified playing time.
            </li>
            <li>
              15. Where a soccer match in the &#34;Today&#34; schedule does not
              start play by 0400hrs (match venue local time) the next morning,
              The Operator will deem bets on the match to be void.
            </li>
            <li>
              16. Where a soccer match that has started is suspended or
              abandoned and is not completed by 0400hrs (match venue local time)
              the following morning, all bets on which a result is still pending
              will be cancelled by the Operator. Any subsequent results, arising
              from resumption of the match at a later stage or from decisions by
              local football authorities, will not be recognized. Where markets
              have been offered and a result already determined, all bets will
              stand and normal settlement will be applied by the Operator.
            </li>
            <li>
              17. The Operator will endeavour on a best efforts basis to display
              Home and Away teams with suitable orientation based on, but not
              limited to, official home / away team, fixture location, market
              consensus, their reasonable assessment. In the event of the venue
              changing from home team to away or vice-versa, or the fixture is
              moved to a neutral ground, the Operator retains the right to
              determine all bets valid or void at their discretion. The Operator
              is not obliged to state any notification of this fact on the
              website or via any other means.
            </li>
            <li>
              18. The odds and goal handicap for any given match are subject to
              fluctuation. All bets will be settled by the Operator at the
              prevailing odds and handicap at the time the bet was confirmed.
            </li>
            <li>
              19. In the event that a match starts before the scheduled kick-off
              time, the Operator reserves the right to deem bets placed prior to
              the originally scheduled time either valid or void. All bets
              placed before the actual (new) start time will be valid.
            </li>
            <li>
              20. Running Ball (in-play) bets may be kept in &#39;pending&#39;
              mode during &#39;high-risk&#39; moments in a match, as defined by
              the Operator. Bets in pending mode on markets relating to goals
              (including Handicap and Over/ Under) may be accepted only if and
              when a &#39;high-risk&#39; moment does not result in a goal being
              scored or red card being issued. Bets in pending mode on markets
              relating to corners or cards may be accepted only if and when a
              &#39;high-risk&#39; moment does not result in a corner being taken
              or card being issued. Even when a &#39;high-risk&#39; moment does
              not result in a goal being scored, corner being taken or card
              being issued, the Operator reserves the right not to accept any
              bet being kept in pending mode. Bet placed while in pending will
              be accepted when the &#39;high-risk&#39; element has passed. This
              includes bets that has been placed prior to the final whistle but
              still in danger until the final whistle has been blown.
            </li>
            <li>
              21. For the purposes of markets relating to corners, any corner
              awarded but not taken will not count. A re-taken corner will only
              count once. The Company&#39;s decision on number of corners taken
              will be final.
            </li>
            <li>
              22. Where The Operator has reasonable grounds to suspect that a
              bet has been placed after an event to which the bet pertained has
              taken place, it reserves the right to cancel the bet without
              having to provide any prior notice, explanation or burden of
              proof.
            </li>
            <li>
              23. The Running Ball &#39;Timer&#39;, ‘Score’ and &#39;Red
              Card&#39; indicator is for reference only. The Operator takes no
              responsibility for losses accrued as a result of this or any other
              such information proving to be erroneous, or as a result of any
              information having been omitted.
            </li>
            <li>
              The Operator reserves the right to cancel any bets placed at the
              wrong score line.
            </li>
            <li>
              24. Extra time (ET) bets are settled based on the ET result within
              the scheduled period of ET play (30 minutes unless otherwise
              specified), or where matches are ended legitimately and given an
              official result by the referee. This includes any additional
              minutes of injury or stoppage time. Any goals, or corners or cards
              that were taken, or scored or shown during regulation time do not
              count, and market lines do not include these.
            </li>
            <li>
              25. Extra time Half-time (ET HT) bets are settled based on the
              Extra time half-time result. ET HT results stand regardless of
              whether the match reaches FT. Any goals, or corners or cards that
              were taken, or scored or shown during regulation time do not
              count, and market lines do not include these.
            </li>
            <li>
              26. Penalties shoot out betting. When this market is being offered
              the handicap betting on this market will include all penalties
              taken in the shoot-out. However for over/under betting only the
              first 5 penalties for each side will count for settlement
              purposes. Any penalties that were taken, or scored during
              regulation time or extra time do not count, and market lines do
              not include these.
            </li>
            <li>
              27. Extra time Half-time (ET HT) bets are settled based on the
              Extra time half-time result. ET HT results stand regardless of
              whether the match reaches FT. Any goals, or corners or cards that
              were taken, or scored or shown during regulation time do not
              count, and market lines do not include these.
            </li>
            <li>
              28. Penalties shoot out betting. When this market is being offered
              the handicap betting on this market will include all penalties
              taken in the shoot-out. However for over/under betting only the
              first 5 penalties for each side will count for settlement
              purposes. Any penalties that were taken, or scored during
              regulation time or extra time do not count, and market lines do
              not include these.
            </li>
            <li>
              29. The Operator reserves the right to delay settlement of any
              market in the event of uncertainty surrounding a result. In such
              cases The Operator will endeavour to determine the correct outcome
              and will not consider &$39;official&$39; sources if such sources
              appear manifestly inaccurate. The Operator’s decision in all such
              cases will be final.
            </li>
            <li>
              30.In the event that either team begins the match with fewer than
              11 players, The Operator reserves the right to deem bets placed
              either valid or void.
            </li>
          </ol>
          <h4 className="text-sm font-bold">Genie Bet Markets</h4>
          <h2 className="text-lg font-bold">
            1. General Football Betting Rules
          </h2>
          <ol className="text-sm text-gray-700">
            <li>
              1. Genie Bet placed on Football applies to 90 minutes plus injury
              time, unless it is explicitly stated that the bet applies to
              Extra-time and/or Penalties. For all bets containing such wording,
              the remaining selections in the bet will be settled on the match
              [i] (90 minutes plus injury time) result, unless stated otherwise.
              Match officials determine whether the full 90 minutes and injury
              time is to be played or has been played, all bets are active
              unless the match is deemed as abandoned (please refer to 1.7).
            </li>
            <li>
              2. Any reference to ‘bet’ refers to the entire contents of a Genie
              Bet betslip. Any reference to a ‘selection’ is in reference to one
              selection within the related bet. Genie Bet is the aggregate bet
              compromised of all constituent selections.
            </li>
            <li>
              3. If a player in the bet does not take any part in the match,
              then the whole bet will be made void, regardless of the rest of
              the selections within the bet. This rule refers to any player
              related markets involving both goals and cards. Please refer to
              section 2 for period related player selections.
            </li>
            <li>
              4. If all the selections within the bet are valid (all players
              involved within the bet take part within the match), any losing
              selection within the bet will deem the entire bet a losing bet.
            </li>
            <li>
              5. For any obvious pricing errors, we reserve the right to
              cancel/void any bets placed at that wrong price. We also reserve
              the right to cancel/void any bets on events where the venue is
              changed after the publication of odds.
            </li>
            <li>
              6. All markets will be settled on the result of the match on the
              day that it is played and completed. Any results that are changed
              retrospectively, for example: dubious goals panel reviews, results
              reversed for ineligible players, will not alter the settlement of
              the market.
            </li>
            <li>
              7. If an event is abandoned, any selections where the outcome has
              already been decided e.g. half-time result or first team to score,
              will stand. All other selections will be made void regardless of
              the score-line at the time of abandonment. Abandoned matches will
              be deemed to be matches which do not reach their natural
              conclusion by midnight local time. Matches where a referee removes
              the players from the field of play for a temporary period, but the
              remaining minutes of play take place by midnight local time on
              that same day, will not be deemed as abandoned.
            </li>
            <li>
              8. If an event is postponed before the kick-off and subsequently
              rescheduled to be played less than 48 hours from the original
              kick-off, all bets will stay active and will be settled upon the
              result of the rescheduled event. If an event is postponed before
              the kick-off and subsequently rescheduled to be played more than
              48 hours from the original kick-off, all bets will be voided.
            </li>
            <li>
              9. Any event where the kick-off date/time has been altered well in
              advance (e.g. to accommodate live TV or to ease fixture
              congestion) will not be classed as postponed.
            </li>
            <li>
              10. For matches played at a neutral venue, all bets will still
              count regardless of the order the teams are listed and whether we
              have indicated it is as being played at a neutral venue (except in
              the situation of an obvious pricing error, please refer to 1.3).
            </li>
          </ol>
          <h2 className="text-lg font-bold">2. Bet Period Rules</h2>
          <ol className="text-sm text-gray-700">
            <li>
              1. All below periods (2.2-2.7) are periods that can be taken with
              markets (3.1-3.22). For example, a bet containing: 90mins (2.2)
              period with Who will win? (3.1), you are betting on the result
              over the entirety of the match (90 mins plus injury time).
            </li>
            <li>
              2. 90 mins – This refers to the entirety of the match. All bets
              involving 90 min selections apply to 90 minutes plus injury time.
              Match officials determine whether the full 90 minutes and injury
              time is to be played or has been played. Any event occurring
              before the official start of the match, during the half-time break
              (any time after the whistle for half time and before the start of
              the second half), or after the final whistle do not count.
            </li>
            <li>
              3. 1st 10 mins – This refers to the first 10 minutes of the match
              (00:00 and 09:59). For example, a corner awarded in this period
              but not taken until after 10:00 will not count. Any event that
              occurs 10:00 or later within the match will not count. Any event
              occurring before the official start of the match does not count.
            </li>
            <li>
              4. 1st half – This refers to the first half of the match only,
              including any injury time minutes played within it. Any event
              occurring before the official start of the match or during the
              half-time break (any time after the whistle for half time) will
              not count.
            </li>
            <li>
              5. 2nd half – This refers to the second half of the match only,
              including any injury time minutes played within it. Any event
              occurring before the second half (first half or during the
              half-time break) or after the final whistle will not count.
            </li>
            <li>
              6. Each half – This refers to an event happening in both halves of
              the match. If the chosen event happens in neither half or within
              only one of the halves, this will be deemed a losing selection.
              Any event occurring before the official start of the match or
              during the half-time break (any time after the whistle for half
              time and before the start of the second half) or after the final
              whistle will not count.
              <ul className="text-sm text-gray-700">
                <li>
                  For any ‘each half’ period player-related bets, if the player
                  is to participate in any part of the first half, then this
                  selection will stand. If they are not to participate in the
                  first half, then this selection will be voided.
                </li>
              </ul>
            </li>
            <li>
              7. Either half – This refers to an event happening in one or both
              halves of the match. If the chosen event doesn’t happen within the
              match, this will be deemed a losing selection. Any event occurring
              before the official start of the match, during the half-time break
              (any time after the whistle for half time and before the start of
              the second half), or after the final whistle will not count. 9.
              For any player-related bets in relation with ‘either half’, if the
              player participates at any point in the match, then this selection
              will stand. For example, for a player to score either half, if
              they score in the first half but do not play in the second half,
              this will be a winning selection. If they are not to participate
              in the match at all, then this selection will be voided.
            </li>
          </ol>
          <h2 className="text-lg font-bold">2. Bet Type Settlement Rules</h2>
          <ol className="text-sm text-gray-700">
            <li>
              Who will win? – You are betting on the result, e.g. Team A, Draw
              or Team B.
            </li>
            <li>
              Who will score? – You are betting on whether a nominated player
              will score a goal.
              <ul className="text-sm text-gray-700">
                <li>
                  In abandoned matches, any player who has already scored at the
                  time of abandonment will be settled as a winner (in relation
                  to this market).
                </li>
                <li>
                  If the named player does not take part in the match, bets on
                  that player will be made void. If the player takes any part in
                  the match, bets will stand.
                </li>
                <li>Own goals do not count.</li>
              </ul>
            </li>
            <li>
              Who will get carded? – You are betting on whether the nominated
              player will receive a Yellow or Red Card. Only cards shown to
              players currently on the pitch within the match will count. Cards
              shown to managers, players on the bench or after the match do not
              count. If the player does not play, bets taken on the player will
              be made void.
            </li>
            <li>
              How many corners? – You are betting on whether the total number of
              corners will be above or below the numbers quoted. Only corners
              that are taken will count. Corners that are indicated as given but
              subsequently not taken will not count. If a corner is re-taken, it
              will only count as one corner. Extra-time does not count towards
              the total.
            </li>
            <li>
              How many booking points? – You are betting on whether the total
              number of booking points is above or below the stated total.
              Extra-time does not count towards the total nor do booking points
              received before kick-off and/or after the final whistle. Only
              cards shown to players currently on the pitch will count. Cards
              shown to managers or substitutes do not count towards the total.
              <ul className="text-sm text-gray-700">
                <li>
                  Yellow Card = 10 & Red Card = 25. If a player receives 2
                  yellow cards and is consequently shown a red card, the player
                  receives a total of 35 booking points.
                </li>
              </ul>
            </li>
            <li>
              How many cards? – You are betting on whether total number of cards
              is above, below or exactly the stated total. Extra-time does not
              count towards the total nor do booking points received before
              kick-off and/or after the final whistle. Only cards shown to
              players currently on the pitch will count. Cards shown to managers
              or substitutes do not count towards the total.
              <ul className="text-sm text-gray-700">
                <li>
                  Yellow Card = 1 & Red Card = 2. If a player receives 2 yellow
                  cards and is consequently shown a red card, the player
                  receives a total of 3 cards. No player can receive more than 3
                  cards for settlement purposes. For example, a player receiving
                  a yellow card then a straight red card receives 3 cards for
                  settlement purposes. A player receiving two yellows and
                  consequently a red card receives 3 cards for settlement
                  purposes, also. A straight red on its own counts as 2 cards
                  for settlement purposes.
                </li>
              </ul>
            </li>
            <li>
              Will both teams score? – You are betting on whether both teams
              will score at least one goal each.
            </li>
            <li>
              What will the score be? – You are betting on what the score will
              be.
            </li>
            <li>
              How many goals? – You are betting on how many goals will be
              scored.
              <ul className="text-sm text-gray-700">
                <li>
                  Whether the total number of goals will be above or below
                  (over/under) the stated total. Exactly - How many goals
                  exactly will be scored in the match, e.g. no goals, exactly 1
                  goal etc.
                </li>
              </ul>
            </li>
            <li>
              10. What else will happen? – You are betting on whether a
              nominated match event will occur (within 90 minutes plus injury
              time, Extra-Time and/or Penalties do not count), including:
              <ol className="text-sm text-gray-700">
                <li>
                  1. Penalty awarded - Whether a penalty will be taken (and
                  subsequently missed/scored). Penalties awarded but rescinded,
                  for any reason, and subsequently are not taken will not be
                  deemed a winning selection.
                </li>
                <li>
                  2. Penalty missed - Whether a penalty will be missed. This is
                  any penalty taken that does not result in a goal from that
                  kick directly. If a penalty is ordered to be retaken, the
                  original penalty will not count towards any official
                  settlement. Only a completed penalty outcome is applicable. If
                  a penalty rebounds from either the woodwork or the goalkeeper
                  and is touched again before a goal is awarded, this will be
                  deemed as a miss.
                </li>
                <li>
                  3. Penalty scored - Whether a penalty will be scored. This is
                  any penalty taken that results in a goal directly from this
                  kick. If a penalty rebounds from either the woodwork or the
                  goalkeeper and is touched again before a goal is awarded, this
                  will be deemed as a miss. Penalties awarded but rescinded and
                  subsequently not taken will not be deemed a winning selection.
                </li>
                <li>
                  4. 2+ penalties awarded - Whether two, or more, penalties will
                  be taken (and subsequently missed/scored). Penalties awarded
                  but rescinded and subsequently not taken will not be deemed as
                  a penalty awarded.
                </li>
                <li>
                  5. 2+ penalties scored - Whether two, or more, penalties will
                  be scored. Penalties scored but ordered to be retaken, the
                  original penalty will not count.
                </li>
                <li>
                  6. Free-kick goal - Whether a free kick will be scored. Any
                  bets involving free-kick goals must be scored directly from a
                  free-kick. Penalties do not count. The player taking the free
                  kick must be the scorer of the goal.
                </li>
                <li>
                  7. Header goal - Whether a header will be scored over the
                  course of the match. A headed goal is a goal that is classed
                  as coming off the player’s head or shoulder, whether it is
                  intentional or not. Own goals are excluded.
                </li>
                <li>
                  8. Outside box goal - Whether a goal will be scored from
                  outside of the 18-yard box/penalty area). Own goals are
                  excluded, any other method of goal scored from outside of the
                  penalty area will count, including free kicks.
                </li>
                <li>9. Own goal - Whether an own goal will be scored.</li>
                <li>
                  10. Sending off - Whether a player is sent off. Only cards
                  awarded once the player is active in the match will count. Any
                  cards shown after the final whistle do not count. A player to
                  be sent off is settled on any active player that receives a
                  red card, whether that is a straight red card or because of
                  two yellow cards. If the red card is retracted, by VAR or
                  otherwise, then this will not count as a winning selection.
                </li>
                <li>
                  11. Woodwork - Whether the frame of the goal is hit during
                  active play. Instances where the ball hits the woodwork which
                  result directly in a goal do not count as woodwork being hit.
                </li>
                <li>
                  12. Go to extra time – Whether the match will go to extra-time
                  after the 90 minutes, in applicable matches where extra-time
                  can be played.
                </li>
                <li>
                  13. Go to penalties – Whether the match will go to penalties
                  in applicable matches where this can happen. In all other
                  scenarios other than when this is achieved, the selection
                  would be a losing one.
                </li>
              </ol>
            </li>

            <li>
              11. How many team goals? – You are betting on how many goals a
              nominated team will score, including:
              <ol className="text-sm text-gray-700">
                <li>
                  1. How many team goals - Whether the total number of team
                  goals in the match will be above or below the stated total.
                </li>
                <li>
                  2. How many goals exactly the nominated team will score in the
                  match, e.g. No Goals, Team A Exactly 1 Goal, Team B Exactly 3
                  Goals etc. (own goals are included).
                </li>
              </ol>
            </li>

            <li>
              12. How many goals will a team win by? – You are betting on by
              what margin a nominated team will win.
            </li>
            <li>
              13. How many team booking points? – You are betting on whether the
              total number of booking points for your nominated team/teams is
              above or below the stated total. Only cards shown to players
              currently on the pitch will count. Cards shown to managers or
              substitutes do not count towards the total. Neither cards shown
              after the final whistle nor cards shown in extra-time count
              towards the total.
              <ul className="text-sm text-gray-700">
                <li>
                  Yellow Card = 10 & Red Card = 25. If a player receives 2
                  yellow cards and is therefore subsequently shown a red card,
                  they receive a total of 35 booking points.
                </li>
              </ul>
            </li>
            <li>
              14. How many team corners? – You are betting on whether the total
              number of corners taken by your nominated team/teams will be above
              or below the numbers quoted.
              <ul className="text-sm text-gray-700">
                <li>
                  Only corners that are taken will count. Corners that are
                  indicated as given but subsequently not taken will not count.
                  If a corner is re-taken, it will only count as one corner.
                  Extra-time does not count towards the total.
                </li>
              </ul>
            </li>
            <li>
              15. What else will happen to teams? – You are betting on whether a
              nominated match event will occur to a nominated team (within 90
              minutes plus injury time, Extra-Time and/or Penalties do not
              count), including:
              <ol className="text-sm text-gray-700">
                <li>
                  1. Team penalty taken - Whether a penalty will be taken over
                  by your nominated team. Penalties awarded but rescinded and
                  subsequently not taken will not be deemed a winning selection.
                  Only a completed penalty outcome is applicable.
                </li>
                <li>
                  2. Team penalty missed - Whether a penalty will be missed by
                  your nominated team. This is any penalty taken that does not
                  result in a goal from that kick by the nominated team. Missed
                  penalties that are then re-taken do not count. Only a
                  completed penalty outcome is applicable. If a penalty rebounds
                  from either the woodwork or the goalkeeper and is touched
                  again before a goal is awarded, this will be deemed as a miss.
                </li>
                <li>
                  3.Team penalty scored - Whether a penalty will be scored by
                  your nominated team. If a penalty rebounds from either the
                  woodwork or the goalkeeper and is touched again before a goal
                  is awarded, this will be deemed as a miss. Penalties scored
                  but ordered to be retaken, the original penalty will not
                  count.
                </li>
                <li>
                  4.Team 2+ penalties awarded - Whether two, or more, penalties
                  will be taken by your nominated team. Penalties awarded but
                  rescinded and subsequently not taken will not be deemed as a
                  penalty awarded.
                </li>
                <li>
                  5.Team 2+ penalties scored - Whether two, or more, penalties
                  will be scored by your nominated team. Penalties scored but
                  ordered to be retaken, the original penalty will not count.
                </li>
                <li>
                  6.Team free-kick goal - Whether a free kick will be scored by
                  your nominated team. Any bets involving free-kick goals must
                  be scored directly from a free-kick. Penalties do not count.
                </li>
                <li>
                  7. Team header goal - Whether a header will be scored by your
                  nominated team. A headed goal is a goal that is classed as
                  coming off the player’s head or shoulder, whether it is
                  intentional or not. Own goals are excluded.
                </li>
                <li>
                  8. Team outside box goal - Whether a goal will be scored from
                  outside of the 18-yard box/penalty area by your nominated
                  team. Own goals are excluded. Any goal from outside of the box
                  will be classed as a winner, intentional or not. Free kicks
                  are included.
                </li>
                <li>
                  9. Team sending off - Whether a player, for your nominated
                  team only, is sent off. Only cards awarded once the player is
                  active in the match will count. Any cards shown after the
                  final whistle do not count. A player to be sent off is settled
                  on any active player that receives a red card, whether that is
                  a straight red card or automatically resulting from 2 yellow
                  cards.
                </li>
                <li>
                  10. Team clean sheet - Whether your nominated team will keep a
                  clean sheet. For example, 0-0, 1-0 to your team, 2-0 to your
                  team etc. would be winning selections.
                </li>
                <li>
                  11. First team to score – Which team will score the first
                  goal. Rescinded and/or disallowed goals do not count, only
                  official goals count. If no goal is scored in the match, this
                  market will be resulted as a loser.
                </li>
                <li>
                  12. Last team to score - Which team will score the last goal.
                  Rescinded and/or disallowed goals do not count, only official
                  goals count. If no goal is scored in the match, this market
                  will be resulted as a loser.
                </li>
                <li>
                  13. First corner – Which team will be awarded and subsequently
                  take the first corner. If no corners are awarded in the
                  specified period, this would be a losing selection.
                </li>
                <li>
                  14. Last corner – Which team will be awarded and subsequently
                  take the last corner of the match. If no corners are awarded
                  in the specified period, this would be a losing selection.
                </li>
                <li>
                  15. Most corners – Which team will take the most corners in
                  the match. If the match corner count is level at full-time,
                  the selection will be a losing one. Your nominated team needs
                  to get more than the opponents for this to be a winning
                  selection.
                </li>
                <li>
                  16. First card - Which team will be awarded the first card,
                  yellow or red, in the match. If no cards are awarded in the
                  specified period, this would be a losing selection.
                </li>
                <li>
                  17. Last card - Which team will be awarded the last card,
                  yellow or red, in the match. If no cards are awarded in the
                  specified period, this would be a losing selection.
                </li>
                <li>
                  18. Most booking points – Which team will receive the most
                  booking points in the match. If no booking points are awarded
                  (no cards shown) in the match, this will be resulted as a
                  loser. Your nominated team must receive more booking points
                  than the opponent for this to be a winning selection.
                </li>
                <li>
                  19. Most cards – Which team will receive the most cards in the
                  match. If no cards are shown in the match, this will be
                  resulted as a loser. Your nominated team must receive more
                  cards than the opponent for this to be a winning selection.
                  <ul>
                    <li>
                      20. Yellow Card = 1 card & Red Card = 2 cards. If a player
                      receives 2 yellow cards and is therefore subsequently
                      shown a red card, they receive a total of 3 cards. The
                      maximum cards one player can receive is 3. A straight red
                      card equates to 2 cards.
                    </li>
                  </ul>
                </li>
              </ol>
              <li>
                16. Which player will score first/last? – You are betting on
                which player will score the first/last goal within the match.
                <ul className="text-sm text-gray-700">
                  <li>
                    Bets will be settled according to which player scores the
                    first/last goal for their own team during the match.
                  </li>
                  <li>
                    Own goals do not count. For example, if you have bet a
                    player to score the first goal in the match and the first
                    goal was an own goal, then the bet will be settled on the
                    next goal that is scored. In this same scenario the scorer
                    of the first goal, which is not an own goal, will be settled
                    as the first goal scorer.
                  </li>
                  <li>
                    In relation to ‘Which player will score first’, if your
                    player has not participated in the match at the point the
                    first goal is scored, selections will be made void.
                  </li>
                  <li>
                    In relation to ‘Which player will score last’, if your
                    player has participated in the match before or during the
                    time the last goal is scored, related selections will stand.
                  </li>
                  <li>
                    If no goal is scored in the match, or only own goals have
                    been scored in the match, any selections on a player to
                    score first or last will be resulted as losing selections,
                    if they have participated in the relevant time-frame as
                    stated in the above two points.
                  </li>
                </ul>
              </li>
              <li>
                17. How many player goals? – You are betting on whether the
                nominated player will score 1+/2+ or 3+ goals in the match. Own
                goals are excluded.
              </li>
              <li>
                18. How will a player score? – You are betting on the method by
                which the nominated player will score, with the following
                options available (own goals are excluded for all):
                <ol className="text-sm text-gray-700">
                  <li>
                    1. Header – the nominated player scores a goal that is
                    classed as coming off the player’s head or shoulder, whether
                    it is intentional or not.
                  </li>
                  <li>
                    2. Free Kick – the nominated player scores a direct free
                    kick for their own team.
                  </li>
                  <li>
                    3. Outside of the box – the nominated player scores from
                    outside of the 18-yard penalty area for their own team. Free
                    kick scored from outside of the box counts as a winning
                    selection.
                  </li>
                  <li>
                    4. Penalty – the nominated player scores a penalty for their
                    own team. The goal must be scored directly from this
                    penalty. A re-bound from a penalty will not be classified as
                    a goal scored by penalty.
                  </li>
                </ol>
              </li>
            </li>
            <ul className="text-sm text-gray-700">
              <li>
                19. Who will get carded or sent off? – You are betting on (for
                the carded element) whether a nominated player will receive a
                yellow or red card.
              </li>
              <li>
                You are betting on (for the sent off element) whether a
                nominated player will receive a red card. Only cards awarded
                once the player is active in the match will count. Any cards
                shown after the final whistle or during the half time period do
                not count. A player to be sent off is settled on any active
                player that receives a red card, whether that is a straight red
                card or 2 yellow cards and is therefore subsequently shown a red
                card.
              </li>
              <li>
                Cards shown before kick-off, during the half time interval or
                after full time will not count. Cards shown to players or
                officials who do not constitute active on-field players do not
                count.
                <ol className="text-sm text-gray-700">
                  <li>
                    1. First player carded – Which player will be awarded the
                    first card, yellow or red, in the match. If no cards are
                    awarded in the specified period, these selections will be
                    losing selections.
                  </li>
                  <li>
                    2. First team player carded – Which player will be awarded
                    the first card, yellow or red, for their team only in the
                    match. If no cards are awarded in the specified period,
                    these selections will be losing selections.
                  </li>
                </ol>
              </li>
            </ul>
            <li>
              20. What is the double chance? – You are betting on the match (or
              specified period) ending in one of the two displayed outcomes. For
              example, Team A/Draw would require the match (or specified period)
              to end with Team A winning, or a draw in order to be a winning
              selection.
            </li>
            <li>
              21. Who will be ahead at half-time/full-time – You are betting on
              the result of the match at half-time and at full-time, both need
              to be correct in order to be a winning selection.
            </li>
            <li>
              22. How many team cards? – You are betting on the number of cards
              for the nominated team during the match. Only cards shown to
              players on the pitch during active periods of the match will
              count, cards shown to managers or substitutes do not count.
              <ol className="text-sm text-gray-700">
                <li>
                  Only one yellow card will count for a second bookable offence.
                  Two yellows that consequently lead to a red card will count as
                  three cards total. The same applies for a yellow card followed
                  by a straight red card. The maximum card count one player can
                  be issued with is three.
                </li>
                <li>
                  Cards shown before kick-off, during the half-time interval or
                  after full time will not count. Cards shown to players or
                  officials who do not constitute active on-field players do not
                  count.
                </li>
              </ol>
              <li>
                23. How will a team win? – You are betting on different markets
                relating to how a team will win,including:
                <ol className="text-sm text-gray-700">
                  <li>
                    Winning margin - By what margin the nominated team will win
                    by.
                  </li>
                  <li>
                    Win to nil - Whether the nominated team wins to nil. For
                    example, your nominated team winning 1-0, 2-0 etc. would
                    result in this being a winning selection.
                  </li>
                  <li>
                    Win from behind - Whether the nominated team wins the match
                    (or specified period) from behind.
                  </li>
                  <li>
                    Win in extra-time - Whether your nominated team wins the tie
                    in extra-time. To be a winning selection your team must win
                    the extra-time period (2 x 15 minutes plus injury time
                    unless otherwise stated). If the match does not go to
                    extra-time this will be a losing selection. If a fixture is
                    postponed, normal postponed match rules apply. If a fixture
                    is abandoned, normal abandoned match rules apply.
                  </li>
                  <li>
                    Win on penalties - Whether your nominated team wins the tie
                    after penalties. Bets are settled only on fixtures that go
                    to penalties. If the match does not go to penalties this
                    will be a losing selection. If a fixture is postponed,
                    normal postponed match rules apply. If a fixture is
                    abandoned, normal abandoned match rules apply.
                  </li>
                  <li>
                    Qualify - Whether your nominated team qualifies to the next
                    round of the next round of fixtures in the specified
                    tournament/cup/league. If a fixture is postponed normal
                    postponed match rules apply. If a fixture is abandoned
                    normal abandoned match rules apply. In the event of a
                    forfeit or bye for either team, please refer to the
                    postponed rules (1.8).
                  </li>
                </ol>
              </li>
              <hr />
              <p className="text-sm text-gray-700">
                Match refers to 90 minutes plus injury time, unless it is
                explicitly stated that the bet applies to Extra-time and/or
                Penalties. Match officials determine whether the full 90 minutes
                and injury time has been played.
              </p>
              <p className="text-sm text-gray-700">
                Active (in a match context) refers to periods of play within the
                match. Before the official start of the match, after the whistle
                for half-time up until the official start of the second half,
                and after the final whistle will not count as active periods.
                Active in reference to a player refers to a player on the pitch
                during the relevant periods of play within the match.
              </p>
              <h2 className="text-lg font-bold">3. Tennis</h2>
              <h4 className="text-lg font-bold">General / Exchange Markets</h4>
              <ul className="text-sm text-gray-700">
                <li>
                  If a player or pairing retires or is disqualified in any
                  match, the player or pairing progressing to the next round (or
                  winning the tournament in the case of a final) will be deemed
                  the winner. However, if less than one set has been completed
                  at the time of the retirement or disqualification, then all
                  bets relating to that individual match will be void.
                </li>
                <li>
                  All bets will stand regardless of changes to scheduled venues,
                  including any changes to a different type of surface.
                </li>
                <li>
                  If the scheduled duration of a match is reduced or increased
                  in the number of games/sets required to win, all bets will be
                  void except for those on markets which have been
                  unconditionally determined. Please note that this does not
                  apply to &#39;Match Odds&#39; or &#39;Set Winner&#39; markets
                  on Davis Cup matches or &#39;dead rubber&#39; matches that
                  have been shortened from five sets to three sets after the
                  market has been loaded, provided that the match has been
                  shortened in accordance with the competition&#39;s rules.
                </li>
                <li>
                  Where markets are offered on individual games or sets within a
                  match, a retirement or disqualification during a game or set
                  will render bets on that game or set market and all individual
                  game or set markets void except those on markets which have
                  been unconditionally determined.
                </li>
              </ul>
              <h6 className="text-lg font-bold">Fancy Markets</h6>
              <h6 className="text-lg font-bold">
                Retirement or Disqualification:
              </h6>
              <ol className="text-sm text-gray-700">
                <li>
                  1. Head to Head Matchups:
                  <ul className="text-sm text-gray-700">
                    <li>
                      One full set must be completed for Money Line wagers to
                      stand. If less than 1 set is completed, all Money Line
                      wagers will be considered void. The winner of the match is
                      the participant declared the victor by the umpire of the
                      match. Example: Nadal trails 0-6, 0-2 vs Djokovic and
                      Djokovic is forced to retire due to injury (or
                      disqualification). All money line wagers stand. Nadal is
                      declared the winner while Djokovic is deemed the loser.
                      All other bets on the Spread, total, team total and sets
                      betting will be void regardless of current score.
                    </li>
                    <li>
                      If a player retires before the 1st set is completed, all
                      wagers on the match will be considered void. Example:
                      Nadal leads 2-0 vs Djokovic who retires due to injury. All
                      wagers considered void.
                    </li>
                  </ul>
                </li>
                <li>
                  2. First Set Betting:
                  <ul className="text-sm text-gray-700">
                    <li>
                      If the first set is not completed because of a player
                      retirement or disqualification, all bets on the match will
                      be considered void. Such wagers will be cancelled and the
                      monies refunded. If the first set in a match is completed,
                      the wagers are graded and will stand on that line.
                    </li>
                  </ul>
                </li>
                <li>
                  3. Sets Betting: (Set Handicap)
                  <ul className="text-sm text-gray-700">
                    <li>
                      If a tennis match is not completed because of a player
                      retirement or disqualification, all Set betting wagers
                      will be considered void. Such wagers will be cancelled and
                      the monies refunded. Example: If we offer Player A (-1.5
                      sets or -2.5 sets) vs Player B (+1.5 sets or +2.5 sets)
                      the match must be completed. If the match is not
                      completed, wagers on that line are void. If we offer
                      Player A to win exactly 2 sets to 1 or Player B to win
                      exactly 2 sets to 1, those lines would be cancelled and
                      refunded in the case of a retirement as well.
                    </li>
                  </ul>
                </li>
                <li>
                  4. Handicap and Total Games Betting: (Match Totals)
                  <ul className="text-sm text-gray-700">
                    <li>
                      If a tennis match is not completed because of a player
                      retirement or disqualification, all Handicap and Total
                      Games bets will be considered void, regardless of the
                      score of the match. Such wagers will be cancelled and the
                      monies refunded.
                    </li>
                  </ul>
                </li>
                <li>
                  5. Proposition Betting: (To Win Set)
                  <ul className="text-sm text-gray-700">
                    <li>
                      If a tennis match is not completed because of a player
                      retirement or disqualification, all proposition wagers
                      will be considered void. Such wagers will be cancelled and
                      the monies refunded, with some exceptions pertaining to
                      propositions that require the completion of an individual
                      set. Example: To Win 1st Set (Must Complete 1st Set)
                    </li>
                  </ul>
                </li>
                <li>
                  6. Team Total Betting: (Player Totals)
                  <ul className="text-sm text-gray-700">
                    <li>
                      If a match ends with a player retirement, the team total
                      bets for each individual player will be voided and graded
                      as no action. A match must be completed for team total
                      bets to be graded as action.
                    </li>
                    <li>
                      If one of the players does not start the match, or
                      tournament, all team total bets associated with that match
                      will be graded as no action.
                    </li>
                  </ul>
                </li>
                <li>
                  Delay or Suspension:
                  <ul className="text-sm text-gray-700">
                    <li>
                      If a tennis match is completed, without retirement or
                      disqualification, all wagers stand as written. A delay in
                      the start of a match will not affect the standing of
                      wagers, nor will a suspension, as long as play is resumed
                      and the match completed.
                    </li>
                  </ul>
                </li>
                <li>
                  Pro Set:
                  <ul className="text-sm text-gray-700">
                    <li>
                      If a match is decided on a Pro Set, instead of the normal
                      length of the match, all wagers are refunded except wagers
                      on the 1st set line.
                    </li>
                    <li>
                      If a match plays with a super tie-break or is switched to
                      having a super tie-break, then all wagers will be refunded
                      on that match except for the 1st set winner and money line
                      winner. The 1st set winner will have action and will be
                      graded as normal.
                    </li>
                  </ul>
                </li>
                <li>
                  Change of Venue or Playing Surface:
                  <ul className="text-sm text-gray-700">
                    <li>
                      All bets stand regardless of any change of venue, court
                      surface, changing from indoors to outdoors and vice versa.
                    </li>
                  </ul>
                </li>
                <li>
                  Davis and Federation Cup:
                  <ul className="text-sm text-gray-700">
                    <li>
                      All bets stand regardless of any change of venue, court
                      surface, changing from indoors to outdoors and vice versa.
                      Example: A match is scheduled for 5 sets, but only 3 sets
                      can be played because of weather. The leader at the end of
                      3 sets would be declared the winner of the match. All
                      wagers are refunded except wagers on the 1st set winner
                      line.
                    </li>
                  </ul>
                </li>
                <li>
                  Live Betting (All pre-game rules apply to live wagering in
                  addition to):
                  <ul className="text-sm text-gray-700">
                    <li>
                      The next point must be played for wagers to have action.
                      If either player retires before the next point is played,
                      all wagers taken since the last point are refunded.
                    </li>
                    <li>
                      If the first set is not completed, all bets on the outcome
                      of the match (spread, money line, next set and total) will
                      be void. All bets on a specific game will stand, provided
                      that game was completed in its entirety.
                    </li>
                    <li>
                      Individual Sets Betting: If the stated set is not
                      completed, all live wagers will be voided.
                    </li>
                    <li>
                      Handicap and Total Games Betting: If a tennis match is not
                      completed because of a player retirement or
                      disqualification, all live wagers on Handicap and Total
                      Games will be voided. The wagers will be cancelled and the
                      monies refunded. Note this also applies to live wagers on
                      lines such as: Rafael Nadal to win Set 2 or Novak Djokovic
                      to win Set 3.
                    </li>
                    <li>
                      When betting on an individual game, only the score of that
                      specific game is taken into consideration to determine the
                      winner of the game. If the stated game is not completed,
                      all live wagers on the game will be voided. For example,
                      when wagering on A. Murray Game 5 of Set 1, the winner of
                      game 5 will determine the winner of this bet.
                    </li>
                    <li>
                      If any subsequent games are not played, bets on those
                      specific games will be void.
                    </li>
                  </ul>
                </li>
                <h2 className="text-lg font-bold">4. Table Tennis</h2>
                <ul className="text-sm text-gray-700">
                  <li>
                    1. In the event of a match starting but not being completed
                    for any reason, all bets on the outcome of the match will be
                    void.
                  </li>
                  <li>
                    2. Set Betting (Correct Score) refers to the correct final
                    score in sets.
                  </li>
                  <li>
                    3. Set Winner refers to the winner of a specific set. The
                    respective set must be completed for bets to stand.
                  </li>
                  <li>
                    4. In the case of team matches, in the event of a match-up
                    between players being played twice, only the first result
                    counts.
                  </li>
                </ul>
                <h2 className="text-lg font-bold">5. Greyhound Racing</h2>
                <ul className="text-sm text-gray-700">
                  <li>
                    All bets (excluding those struck on ante-post and Australian
                    licensed markets) are placed on trap numbers. Greyhound
                    names are displayed for information purposes only.
                  </li>
                  <li>
                    Markets will be determined according to the official result
                    at the time the track gives the result green light status,
                    either in the form of an announcement or by display.
                    Subsequent disqualifications, appeals, or amendments to the
                    result will be disregarded.
                  </li>
                  <li>
                    If a non-runner or reserve runner is declared, then all bets
                    prior to the update of the market on the Site will be void
                    and all unmatched bets, including &#39;Take SP&#39; and
                    &#39;keep&#39; bets, will be cancelled (except for certain
                    SP bets as set out in Paragraph 10.5 of Part B above).
                  </li>
                  <li>
                    If there are no finishers in any race or any race is
                    declared void before the official result is declared, then
                    all bets will be void.
                  </li>
                  <li>
                    If the scheduled venue is changed after the market has been
                    loaded by the Site, all bets will be void.
                  </li>
                </ul>
                <h3>Australian Specific Non-Runner Rules</h3>
                <ul className="text-sm text-gray-700">
                  <li>
                    Notwithstanding the above, the following rules apply to
                    declared non-runners in Australian greyhound markets.
                  </li>
                  <li>
                    If a greyhound becomes a notified non-runner after the
                    market is loaded but prior to the commencement of the race,
                    it will be removed and all bets on the market, matched prior
                    to the update of the market on the Site, will be voided.
                  </li>
                  <li>
                    If, following the completion of a race, the stewards declare
                    a greyhound a non-runner, the Site will resettle the market
                    and will void all bets that were placed on that runner only.
                    The Site will then apply a reduction factor to all bets
                    placed on the winner (or placegetters in the case of place
                    markets) based on that runner&#39;s weighted average price.
                  </li>
                </ul>
                <h2 className="text-lg font-bold">6. Horseracing</h2>
                <h4 className="text-lg font-bold">General</h4>
                <ul className="text-sm text-gray-700">
                  <li>
                    All individual race markets will be determined according to
                    the official result at the time of the &#39;weigh-in&#39;
                    announcement (or equivalent). Subsequent disqualifications,
                    appeals, or amendments to the result will be disregarded.
                  </li>
                  <li>
                    If a race is abandoned or otherwise declared void, or in the
                    event of a walkover, all bets on that race will be void.
                  </li>
                  <li>
                    If the scheduled venue is changed after the market has been
                    loaded by the Site, all bets will be void.
                  </li>
                  <li>
                    Where a race does not take part on its scheduled day, all
                    bets will be void.
                  </li>
                  <li>
                    If a scheduled surface type is changed (e.g., turf to dirt)
                    all bets will stand.
                  </li>
                  <li>
                    Horseracing Exchange Multiples are based on the Site&#39;s
                    &#39;day of the race&#39; markets (and not the Site&#39;s
                    ante-post markets). The Site&#39;s horseracing ante-post
                    rules do not therefore apply in relation to horseracing
                    Exchange Multiples.
                  </li>
                </ul>
                <h4 className="text-lg font-bold">The Site Non-Runner Rule</h4>
                <ul className="text-sm text-gray-700">
                  <li>
                    The Site&#39;s non-runner rule relates to the adjustment of
                    odds on bets already matched when a horse in a race is
                    declared a non-runner. In order to make the adjustment, the
                    Site applies a reduction factor to the remaining runners.
                    The reduction factor allocated to a non-runner is a
                    calculation (the details of which are described below) of
                    that horse&#39;s chances of winning (or being placed, etc as
                    appropriate) and is applied to bets already matched on the
                    other runners in the relevant market or markets.
                  </li>
                  <li>
                    Any horse listed when the relevant market is loaded which
                    does not subsequently come under starter&#39;s orders is
                    deemed to be a non-runner.
                  </li>
                  <li>
                    When the market is loaded each horse is given a
                    &#39;reduction factor&#39;, based on a forecast price, which
                    is expressed as a percentage. These reduction factors may be
                    updated periodically at the discretion of the Site based on
                    trading in the market, but after approximately 15 minutes
                    (approximately 5 minutes for Australian and US markets) from
                    the scheduled &#39;off&#39; time of a given race, they will
                    be updated only in exceptional circumstances. The current
                    reduction factor percentage for each horse can be viewed on
                    the &#39;info&#39; page on the Site website or by asking the
                    Helpdesk.
                  </li>
                  <li>
                    Reductions will be made to both win and place markets but
                    applied differently (as described below), and horses will
                    have a different reduction factor for each market.
                  </li>
                  <li>
                    As soon as the Site becomes aware that a horse is an
                    official non-runner or a highly likely non-runner, following
                    a statement to the press from connections, the following
                    will happen:
                    <ul className="text-sm text-gray-700">
                      <li>
                        All matched bets on that horse will be void and the
                        horse will be removed from the market.
                      </li>
                      <li>
                        In the win market: if the reduction factor of the
                        non-runner is 2.5% or greater, the traded price of all
                        the matched bets on the remaining horses will be reduced
                        by an amount equal to the non-runner&#39;s final
                        reduction factor and all the unmatched offers to lay
                        will be cancelled. If the non-runner&#39;s reduction
                        factor is less than 2.5%, reductions will not be applied
                        and unmatched bets will not be cancelled.
                      </li>
                      <li>
                        In the place market the reduction factor of all
                        non-runners will be applied (even if less than 2.5%) and
                        the potential winnings in relation to matched bets on
                        the remaining horses will be reduced by an amount equal
                        to the non-runner&#39;s final reduction factor. Only if
                        the non-runner&#39;s reduction factor is 4.0% or greater
                        will all the unmatched offers to lay be cancelled.
                      </li>
                      <li>
                        All the reduction factors on the remaining horses will
                        be adjusted to reflect their improved chance of winning.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Reduction factors are not applied to bets which are struck
                    in-play. However, if a market is turned in-play prematurely
                    by error (or, for example, there is a false start), all bets
                    matched during this time will be subject to any later
                    reduction factor, provided the market is turned out of play
                    before the race commences. In the event of a late
                    withdrawal, the Site reserves the right to remove the runner
                    after completion of the race. In this case, only those bets
                    matched prior to the off will be affected by a reduction
                    factor.
                  </li>
                  <li>
                    In the event of a non-runner being removed from a race in
                    error or following incorrect information regarding a
                    runner&#39;s participation, the Site will reinstate both the
                    runner and all previously matched bets associated with that
                    runner. All bets made between the time of withdrawal and
                    reinstatement will be void in both the place market and the
                    win market. The reduction factor applied to matched bets at
                    the time of withdrawal will be reversed and the original
                    prices will become valid.
                  </li>
                  <li>
                    Any non-runners will be removed from the relevant markets in
                    the order in which they are brought to the Site&#39;s
                    attention. If the Site becomes aware of more than one
                    non-runner at the same time, it will remove the non-runners
                    from the relevant markets in racecard order.
                  </li>
                  <li>
                    If a runner is not included in a market because of an error
                    or because of incorrect information regarding a runner&#39;s
                    participation, the Site reserves the right to introduce the
                    missing runner into the market at any time prior to
                    settlement (even after the race has been run), provided that
                    the Site has determined that the missing runner is not a
                    material runner (i.e., a selection with a reduction factor
                    of approx. 2.5% or less in the win market). In such
                    circumstances, all pre-play unmatched and matched bets will
                    stand, however, if the runner is not introduced before the
                    start of the race, all in-play bets will be void. However,
                    if the missing runner is deemed to be a material runner,
                    then the malformed market will be void and a new market will
                    be loaded where possible.
                  </li>
                </ul>
                <h4 className="text-lg font-bold">
                  How the Reductions are applied for Exchange markets
                </h4>
                <ul className="text-sm text-gray-700">
                  <li>
                    In the win market, reductions will be made on the traded
                    price. For example: if the non-runner&#39;s final reduction
                    factor is 25%, the traded price on all previously matched
                    bets on other horses will be reduced by 25%. A traded price
                    of 8.0 would become 6.0. And these might be further reduced
                    if another horse is subsequently declared a non-runner.
                  </li>
                  <li>
                    In the place market, reductions will be made to the
                    potential winnings on the bet only, and not the traded
                    price. For example: if the non-runner&#39;s final reduction
                    factor is 25%, the potential winnings on all previously
                    matched bets on the other horses will be reduced by 25%. A
                    traded price of 8.0 would become 6.25.
                  </li>
                  <li>
                    The traded price may be further reduced if any other
                    horse(s) is subsequently declared a non-runner, however,
                    odds cannot be reduced below 1.01.
                  </li>
                  <li>
                    Reserves: A reserve runner may appear in the relevant
                    markets but will have a non-applicable reduction factor
                    until the Site has received confirmation that it is a
                    confirmed runner, in which case an applicable reduction
                    factor may apply to it.
                  </li>
                  <li>
                    For the avoidance of doubt, any reduction factor applicable
                    to a non-runner replaced by a reserve will be applied to all
                    bets struck on the relevant markets, prior to the removal
                    from those markets of such non-runner by the Site. Likewise,
                    should a reserve runner become a confirmed runner but
                    subsequently become a non-runner, any reduction factor
                    applicable to such non-runner will be applied to all bets
                    struck on the relevant markets, prior to the removal from
                    those markets of such non-runner by the Site.
                  </li>
                </ul>
                <h4 className="text-lg font-bold">Additional rules</h4>
                <ul className="text-sm text-gray-700">
                  <li>
                    Card numbers are posted as a guide only: bets are placed on
                    a named horse.
                  </li>
                  <li>Horses will not be coupled.</li>
                  <li>
                    Where any horse(s) runs for purse money only it is deemed a
                    non-runner for betting purposes. Should this result in the
                    number of possible winners stated in the relevant Market
                    Information being equal to or greater than the number of
                    runners in the relevant Site market, all bets in the market
                    will be void.
                  </li>
                </ul>
              </ol>
              <h2 id="modal-modal-title" className="text-lg font-bold">
                E-Sports
              </h2>
              <ul className="text-sm text-gray-700">
                <li>
                  The start dates and times displayed on our website for E-Sport
                  matches are an indication only and are not guaranteed to be
                  correct. That means bets will stand if a match is offered with
                  an incorrect date and/or time.
                </li>
                <li>
                  If a match is actually suspended or postponed and not resumed
                  within 12 hours from the actual scheduled start time, then
                  bets on the match will have no action and be refunded.
                </li>
                <li>
                  The exception being any bet on whether a team/player advances
                  in a tournament or wins the tournament will have action
                  regardless of a suspended or postponed match.
                </li>
                <li>
                  If the name of a player or team is misspelled, all bets will
                  stand as long as it’s clear what game or match the bets are
                  on. If a player or team changes their name, lines offered
                  using their previous name will have action as long as it’s
                  clear what game or match the bets are on.
                </li>
                <li>
                  If in an official match a player plays with the wrong nickname
                  or on a smurf-account, the result is still valid unless it is
                  evident that it is not the player that was supposed to play
                  that match.
                </li>
                <li>
                  All bets will be settled using the official result as declared
                  by the relevant governing body of the competition concerned.
                </li>
                <li>
                  If a draw option has not been made available, then extra time
                  will count, if played.
                </li>
              </ul>
              <ul className="text-sm text-gray-700">
                <li>
                  Handicap Betting A spread in E-Sports can be Rounds/Maps or
                  other counting measures dependent on the game. The spread will
                  only be referred to as the spread (e.g., in Counter Strike the
                  spread will be rounds won, while in Starcraft 2 the spread
                  would be maps).
                </li>
                <li>
                  Handicapping is a way of making a sports contest more even and
                  thus more interesting as a betting object. In E-Sports
                  betting, this is done by awarding one of the teams/players,
                  the underdog, some maps/rounds ahead.
                </li>
                <li>
                  Example of Handicap Odds:
                  <ul>
                    <li>Player A -1.5: Odds 2.00</li>
                    <li>Player B +1.5: Odds 1.85</li>
                    <li>
                      If Player A wins the match by two maps or more, Player A
                      bettors win and Player B bettors lose. If Player A wins by
                      exactly one map or Player B wins, Player B bettors win and
                      Player A bettors lose.
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="text-sm text-gray-700">
                <li>
                  Total Betting A total in E-Sports can be Rounds/Maps or other
                  counting measures dependent on the game. The total will only
                  be referred to as the total.
                </li>
                <li>
                  Example for a best of three SC2 Match:
                  <ul>
                    <li>Over 2.5: Odds 1.93</li>
                    <li>Under 2.5: Odds 1.93</li>
                  </ul>
                </li>
                <li>
                  If either player wins 2-0, all bets on under 2.5 will win,
                  while bets on the over will lose. If either player wins 2-1,
                  all bets on the over win, while bets on the under lose.
                </li>
                <li>
                  If a map is not completed due to player retirement or
                  disqualification, all bets on the outcome will have action and
                  will be validated based on the official declared winner.
                </li>
                <li>
                  Counter-Strike maps are exceptions to this rule, where all
                  moneyline, spread, and total bets are canceled if a team
                  retires or is disqualified before all scheduled map rounds are
                  played.
                </li>
                <li>
                  Should a player/team withdraw before a tournament begins or
                  retire during a tournament, bets on that player/team to win or
                  to advance in the tournament will be canceled and refunded.
                </li>
                <li>
                  If a player/team withdraws before the tournament begins while
                  being listed as “must start,” then bets on whether a
                  player/team advances in the tournament or wins the tournament
                  will have no action and be refunded. This applies to all
                  players/teams participating in the tournament.
                </li>
                <li>
                  If the announced number of maps/rounds is changed or the match
                  is offered with an incorrect map/round format, all bets on the
                  match will be canceled.
                </li>
                <li>
                  If a player/team receives a walkover or win by admin decision
                  on a map before the start of the map, all bets on the map will
                  be canceled.
                </li>
                <li>
                  In CS:GO, if a team retires, receives a win by admin decision,
                  or is disqualified before all scheduled rounds on a map are
                  played, all bets on the map will be canceled.
                </li>
                <li>
                  In Dota2, League of Legends, and other games: If a walkover or
                  win by admin decision is given in the first 10 minutes of a
                  map, all bets on the map will be canceled. If a win by admin
                  decision is awarded past minute 10, the map will be graded
                  using the official result.
                </li>
                <li>
                  If bets on at least one map of a series were canceled due to
                  any of the above reasons, all bets on the series line will
                  also be canceled. If at least one map of a series is postponed
                  by more than 12 hours, all bets on the series will be
                  canceled.
                </li>
              </ul>
              <ul className="text-sm text-gray-700">
                <li>
                  Live Betting In live betting, if a map is replayed due to a
                  draw, disconnect, or similar reasons, all live bets on the
                  respective map will be canceled. The replay of the map will be
                  treated as a separate game.
                </li>
                <li>
                  Bets will not be canceled because a team is playing with a
                  stand-in or replacement player. If the event organizer allows
                  for stand-ins and there is an official result, all bets will
                  be graded normally.
                </li>
                <li>
                  In games with a Hero Draft/Champions Select phase (e.g., Dota
                  2, LoL), bets during this phase are allowed.
                </li>
              </ul>
              <h4 className="text-lg font-bold">Markets:</h4>
              <ul className="text-sm text-gray-700">
                <li>
                  Minutes: A total will be offered on the duration of a map (in
                  minutes). If the map ends in fewer minutes than the total
                  offered, the “under” wins and the “over” loses. If the map
                  lasts longer than the total offered, the “over” wins and the
                  “under” loses. If the map ends at exactly the same number of
                  minutes as the total offered, bets will be pushed and money
                  returned.
                </li>
                <li>
                  First Tower: The first team that has one of their towers
                  destroyed loses this bet.
                </li>
                <li>
                  First Blood: The team that is announced in-game to get
                  &#34;First Blood&#34; wins this bet.
                </li>
                <li>
                  1st to 10 kills: The first team to get to 10 kills on the
                  in-game scoreboard wins this bet.
                </li>
                <li>
                  1st Round: The team that wins the first round wins this bet.
                </li>
                <li>
                  1st to 5 Rounds: The team that first wins 5 rounds wins this
                  bet.
                </li>
                <li>
                  In Dota 2 and LoL, any Kill markets will be graded using the
                  in-game scoreboard, displayed at the top of the screen.
                </li>
              </ul>
              <ul className="text-sm text-gray-700">
                <li>
                  If a 5v5 team match starts with less than 10 players, or if a
                  6v6 team match starts with less than 12 players, all bets on
                  the map and series will be canceled.
                </li>
                <li>
                  In Dota2 and League of Legends, if a player disconnects during
                  the first 10 minutes and is unable to reconnect or be replaced
                  for the rest of the game, all bets on the map and series will
                  be canceled.
                </li>
                <li>
                  In CS:GO, if at least 5 rounds are played with less than 10
                  players, all bets on the map and series will be canceled.
                </li>
                <li>
                  One or more player(s) disconnecting or quitting after 10
                  minutes into a Dota2 or League of Legends match is not a valid
                  reason for the cancellation of bets on that map or any markets
                  concerning that map.
                </li>
              </ul>
              <ul className="text-sm text-gray-700">
                <li>
                  If a map is remade or rewound (e.g., Chronobreak in League of
                  Legends) after being partially completed, any markets (1st
                  blood, 1st tower, 1st to 10 kills, etc.) already decided will
                  be graded with the results from the partially completed map.
                  Any markets that are not yet decided will be graded with the
                  results from the remade or rewound map.
                </li>
                <li>
                  For CS:GO Live: When betting on lines that are marked with
                  “Full Buy” such as &#34;Natus Vincere (R04, Full Buy) vs
                  Virtus Pro (R04, Full Buy)&#34;, you are betting on who will
                  win the round. The “Full Buy” is a condition that must be met
                  for bets on the round to stand.
                </li>
                <li>
                  A “Full Buy” is defined as follows: At most one player on each
                  team starts the round with a primary weapon worth less than
                  $1000. The weapon does not need to be bought by the player
                  themselves but can be given to them by a teammate.
                </li>
                <li>
                  Example:
                  <ul>
                    <li>
                      NaVi vs Virtus Pro: If NaVi has one player starting with a
                      Desert Eagle and Virtus Pro has one player with a
                      Five-Seven, bets will stand.
                    </li>
                    <li>
                      NaVi vs Virtus Pro: If NaVi has two players with Tec-9,
                      bets will be canceled.
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="text-sm text-gray-700">
                <li>
                  In a match where one team/player has an advantage of one or
                  more maps awarded as part of the tournament format, our match
                  line will include the given advantage. For example, if there
                  is a 1-0 advantage, the map offering will start with map 2.
                </li>
              </ul>
              <ul className="text-sm text-gray-700">
                <li>
                  In games like PUBG, Fortnite, etc., the outright winner will
                  be graded according to the official ranking.
                </li>
                <li>
                  Bets on individual rounds will be graded based on the
                  placement of the team or player in that round.
                </li>
                <li>
                  Bets on the whole event will be graded based on total points
                  (Placement Points + Kill Points).
                </li>
              </ul>
              <ul className="text-sm text-gray-700">
                <li>
                  If we offer markets for a specific player on a specific map,
                  the player must start on that map for bets to stand. If the
                  markets are offered for a specific player for a whole match,
                  the player must start on all maps for bets to stand.
                </li>
                <li>Example:</li>
                <p className="text-sm text-gray-700">
                  Natus Vincere vs FaZe – Map 1 – Total kills by s1mple:
                  Over/Under 21.5. If s1mple is replaced by a different player
                  on Map 1, all bets on this market will be cancelled.
                </p>
              </ul>
              <h2 id="modal-modal-title" className="text-lg font-bold">
                8. Basketball
              </h2>
              <ul className="text-sm text-gray-700">
                <li>
                  In the NBA, all bets on the Game-period are void if fewer than
                  43 minutes are completed. In all other competitions, bets on
                  the Game-period are void if fewer than 35 minutes are
                  completed. Bets on any periods that have been played to
                  completion will have action.
                </li>
                <li>
                  If an &#34;Elam Ending&#34; is used, the target score has to
                  be reached for bets to have action for any period that
                  includes such an ending. All bets will be settled based on the
                  final score once the target score is reached, regardless of
                  the actual duration of the game.
                </li>
                <li>
                  Bets on the Game and 2nd-Half periods include all overtimes
                  played in their result.
                </li>
              </ul>
              <h4 className="text-lg font-bold">Sub-Sport Rules</h4>
              <h4 className="text-lg font-bold">3 on 3 Basketball</h4>
              <ul className="text-sm text-gray-700">
                <li>
                  The Game-period is considered complete when 10 minutes and any
                  overtimes are completed or a team has scored 21 points. If a
                  game is not completed, all bets on it will be void.
                </li>
              </ul>
              <h4 className="text-lg font-bold">Basketball Market Rules</h4>
              <ul className="text-sm text-gray-700">
                <li>
                  1. <strong>NBA Regular Season Wins:</strong> Will be settled
                  when a team exceeds their win total and is expected to play at
                  least 80 of their scheduled games within the NBA regular
                  season, or cannot possibly exceed their win total given their
                  number of games remaining and are expected to play at least 80
                  of their scheduled games. If there is any reasonable doubt
                  about whether or not a team will play 80 games, their Season
                  Wins markets won&#39;t be settled until they play 80 games.
                  Once Season Wins markets have been settled, they will not be
                  changed, even if a team plays fewer than 80 games as the
                  result has been established.
                </li>
                <li>
                  2. <strong>NBA Conference Winners:</strong> The winner of the
                  respective Conference will be the team that reaches the NBA
                  Finals.
                </li>
                <li>
                  3. <strong>Competitor Statistics:</strong> For pre-game and
                  in-play basketball markets that include exactly one or two
                  player names, then all listed players must play in the game
                  for the bet to have action, unless otherwise specifically
                  indicated in the contest.
                </li>
                <li>
                  4. <strong>Buzzer Beater Markets:</strong> A “Buzzer Beater”
                  is defined as a made shot that leaves absolutely no time on
                  the game clock at the end of the game and the shot puts the
                  shooter’s team ahead for the win, when the shooter’s team
                  immediately prior to the shot had been tied or losing.
                </li>
                <li>
                  5. <strong>NBA Division Winners:</strong> NBA Division Winner
                  markets have action as long as all teams in the division have
                  played more than half of their scheduled games at the
                  conclusion of the regular season. Any ties will be broken by
                  the NBA’s determination.
                </li>
                <li>
                  6. <strong>Double/Triple Double Markets:</strong> A “Double
                  Double” is defined as 10 or more of at least two of the
                  following categories: Points, Rebounds, Assists, Steals or
                  Blocks. A “Triple Double” is 10 or more of three of those
                  categories.
                </li>
                <li>
                  7. <strong>NBA Player Statistic Settlement:</strong> Shortly
                  after completion of each NBA game, using official NBA
                  statistics, we will settle the following markets: Points and
                  Three Point Field Goals Made. Due to the fact that NBA
                  sometimes reviews and revises other statistical categories, we
                  will wait until approximately 11:45 PM to settle, based on
                  official NBA statistics, all other additional statistical
                  markets we may choose to offer. Once settlement has occurred
                  on NBA Player statistic markets, it will be final and will not
                  be revised for any subsequent NBA statistical changes.
                </li>
              </ul>
              <h2 id="modal-modal-title" className="text-lg font-bold">
                9. GOLF
              </h2>
              <ul className="text-sm text-gray-700">
                <li>
                  If the number of holes played in a tournament is reduced to 36
                  or more holes from the scheduled number for any reason (e.g.,
                  weather), bets placed prior to the completion of the final
                  completed round have action.
                </li>
                <li>
                  Bets placed after the final completed round will be void.
                </li>
                <li>
                  If holes are reduced and fewer than 36 holes are completed,
                  all bets will be void, except on rounds and markets that have
                  already been settled.
                </li>
                <li>
                  Bets on a golfer’s results in a tournament are void if that
                  golfer does not start the tournament. Starting the tournament
                  includes playing in qualifying rounds.
                </li>
                <li>
                  A golfer is deemed to have played once they have teed off.
                  Once they have teed off, all markets on or including them have
                  action, even if they withdraw.
                </li>
                <li>
                  In the event that two or more golfers are tied for the lead at
                  the end of regulation play, the Site will respect whatever
                  method is used to break the tie. All tied golfers who do not
                  win the tiebreaker will be considered second-place finishers.
                </li>
                <li>
                  Skins tournaments will be determined by the total money won by
                  the competitors. Any format the tournament uses to break ties
                  will be respected. The officially declared winner of the
                  tournament takes precedence over the money won in case there
                  is a difference.
                </li>
              </ul>
              <h4 className="text-lg font-bold">
                Team Competitions (Ryder Cup etc.)
              </h4>
              <ul className="text-sm text-gray-700">
                <li>
                  <strong>Day Winner/Session Winner:</strong> Only scheduled
                  matches for the day will count towards settlement. In the
                  event that matches are not completed on the scheduled day and
                  are carried over, they will count towards the previous day’s
                  Day Winner/Session Winner markets.
                </li>
                <li>
                  <strong>Who Will Hole the Winning Putt:</strong> Settlement
                  will be based on the player who gains the winning half or full
                  point in a tournament. Examples are the player who gets their
                  team to 15.5 points in the Presidents Cup or to 14.5 points in
                  the Ryder Cup. In the event of a tie (for example, 15-15 in
                  the Presidents Cup or 14-14 in the Ryder Cup), all bets will
                  be void, including bets on the player who holes the putt to
                  retain the trophy.
                </li>
                <li>
                  <strong>Tournament Handicap Betting:</strong> Settlement is
                  determined after the completion of all scheduled matches. If
                  the scheduled number of matches cannot be completed, then all
                  bets will be void.
                </li>
                <li>
                  <strong>Match Winner (2-Way):</strong> Match Winner (2-Way)
                  markets are settled on the winner, and include any extra holes
                  played. In the event that the official result is a tie, bets
                  on the Match Winner (2-Way) will be void.
                </li>
                <li>
                  <strong>Match Winner (3-Way):</strong> Match Result (3-Way)
                  and Winning Margin do not include extra holes, if played.
                </li>
              </ul>
              <h4 className="text-lg font-bold">Golf Market Rules</h4>
              <ul className="text-sm text-gray-700">
                <li>
                  <strong>Match-ups:</strong> Bets will be void if both golfers
                  do not tee off. If one golfer misses the cut, the other is
                  deemed the winner, regardless of what happens after the cut.
                  If both miss the cut, the lower scorer after the cut will be
                  deemed the winner.
                </li>
                <li>
                  <strong>Golfer’s Round Score:</strong> Bets will be void if
                  the golfer does not complete the round.
                </li>
                <li>
                  <strong>Next Hole Score:</strong> Bets will be void if the
                  competitor does not complete the hole. Results are determined
                  as the golfer leaves the green, regardless of any penalties
                  incurred later on.
                </li>
                <li>
                  <strong>Handicaps:</strong> Negative handicaps are added to a
                  golfer&#39;s score and positive handicaps are subtracted from
                  their score. Results are then compared and the golfer with the
                  lowest score is the winner. If the listed golfers complete a
                  different number of holes (due to retirement or being cut),
                  the player who plays the most holes wins the Handicap bet.
                  Playoffs do not count for Handicap bets.
                </li>
              </ul>
            </li>
          </ol>

          {/* Footer Button */}
          <Button
            variant="contained"
            color="success"
            onClick={handleClose}
            className="self-end"
          >
            Ok
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
RulsRegulation.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
export default RulsRegulation;
